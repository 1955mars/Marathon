"""
Code execution router - runs Python/C++ code in sandbox
"""
import subprocess
import tempfile
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class CodeRequest(BaseModel):
    code: str
    language: str = "python"
    input: Optional[str] = None
    timeout: int = 5


class CodeResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time_ms: Optional[int] = None


@router.post("/execute", response_model=CodeResponse)
async def execute_code(request: CodeRequest):
    """Execute code and return output."""
    
    if request.language not in ["python", "cpp"]:
        raise HTTPException(status_code=400, detail="Unsupported language")
    
    try:
        if request.language == "python":
            return await run_python(request.code, request.input, request.timeout)
        else:
            return await run_cpp(request.code, request.input, request.timeout)
    except Exception as e:
        return CodeResponse(output="", error=str(e))


async def run_python(code: str, input_data: Optional[str], timeout: int) -> CodeResponse:
    """Run Python code."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        f.flush()
        temp_file = f.name
    
    try:
        result = subprocess.run(
            ['python3', temp_file],
            input=input_data,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        
        output = result.stdout
        error = result.stderr if result.returncode != 0 else None
        
        return CodeResponse(output=output, error=error)
    except subprocess.TimeoutExpired:
        return CodeResponse(output="", error="Execution timed out")
    except Exception as e:
        return CodeResponse(output="", error=str(e))
    finally:
        os.unlink(temp_file)


async def run_cpp(code: str, input_data: Optional[str], timeout: int) -> CodeResponse:
    """Compile and run C++ code."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.cpp', delete=False) as f:
        f.write(code)
        f.flush()
        source_file = f.name
    
    executable = source_file.replace('.cpp', '')
    
    try:
        # Compile
        compile_result = subprocess.run(
            ['g++', '-o', executable, source_file, '-std=c++17'],
            capture_output=True,
            text=True,
            timeout=10,
        )
        
        if compile_result.returncode != 0:
            return CodeResponse(output="", error=f"Compilation error:\n{compile_result.stderr}")
        
        # Run
        run_result = subprocess.run(
            [executable],
            input=input_data,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        
        output = run_result.stdout
        error = run_result.stderr if run_result.returncode != 0 else None
        
        return CodeResponse(output=output, error=error)
    except subprocess.TimeoutExpired:
        return CodeResponse(output="", error="Execution timed out")
    except FileNotFoundError:
        return CodeResponse(output="", error="C++ compiler (g++) not found")
    except Exception as e:
        return CodeResponse(output="", error=str(e))
    finally:
        if os.path.exists(source_file):
            os.unlink(source_file)
        if os.path.exists(executable):
            os.unlink(executable)
