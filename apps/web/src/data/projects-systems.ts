/**
 * Act 2 Projects - Mini Shell & HTTP Server
 * Both projects are fundamental to systems programming and web development
 */

import { Project } from './projects';

// ============================================================
// MINI SHELL
// Real-World: Bash, Zsh, Fish all work this way!
// Understanding this helps with DevOps, scripting, and debugging
// ============================================================
export const miniShellProject: Project = {
    id: "mini-shell",
    title: "Mini Shell",
    act: 2,
    difficulty: "Intermediate",
    estimatedHours: 8,
    description: "Build a Unix shell with command execution, pipes, and signals. Learn how Bash, Zsh, and container runtimes work internally.",
    learningOutcomes: [
        "Understand fork/exec process model",
        "Implement pipe-based IPC",
        "Handle signals gracefully",
    ],
    prerequisites: ["C++ basics", "OS concepts"],
    technologies: ["C++", "Python"],
    steps: [
        {
            id: "step-1",
            title: "Basic Command Execution",
            description: "Parse and execute simple commands using fork/exec.",
            concepts: ["fork", "exec", "wait", "process"],
            code: {
                python: `import subprocess
import shlex

def parse_command(line):
    """Parse command line into arguments"""
    return shlex.split(line)

def execute_command(args):
    """Execute command using subprocess (Python's fork/exec wrapper)"""
    try:
        result = subprocess.run(args, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout, end='')
        if result.stderr:
            print(result.stderr, end='')
    except FileNotFoundError:
        print(f"Command not found: {args[0]}")

def main():
    while True:
        try:
            line = input("mysh> ")
            if line.strip() == "exit":
                break
            args = parse_command(line)
            if args:
                execute_command(args)
        except EOFError:
            break

if __name__ == "__main__":
    main()`,
                cpp: `#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <unistd.h>
#include <sys/wait.h>
using namespace std;

vector<string> parseCommand(const string& line) {
    vector<string> args;
    istringstream iss(line);
    string word;
    while (iss >> word) args.push_back(word);
    return args;
}

void executeCommand(vector<string>& args) {
    pid_t pid = fork();
    
    if (pid == 0) {
        // Child process
        vector<char*> argv;
        for (auto& arg : args) argv.push_back(&arg[0]);
        argv.push_back(nullptr);
        
        execvp(argv[0], argv.data());
        perror("exec failed");
        exit(1);
    } else if (pid > 0) {
        // Parent waits for child
        int status;
        waitpid(pid, &status, 0);
    }
}

int main() {
    string line;
    while (true) {
        cout << "mysh> ";
        if (!getline(cin, line)) break;
        if (line == "exit") break;
        
        auto args = parseCommand(line);
        if (!args.empty()) executeCommand(args);
    }
    return 0;
}`,
            },
            explanation: `## Fork/Exec Model

The shell uses **fork()** to create a child process, then **exec()** to replace it with the command.

### Process Flow:
\`\`\`
Parent (shell)
    |
    fork() --> Child
                |
                exec("ls") --> becomes ls process
    |
    wait() <-- Child exits
\`\`\``,
            tips: ["Always check fork() return value", "exec replaces the process entirely"],
        },
        {
            id: "step-2",
            title: "Pipe Implementation",
            description: "Handle commands with pipes like 'ls | grep txt'.",
            concepts: ["pipe", "dup2", "file descriptors"],
            code: {
                python: `import subprocess

def execute_pipe(cmd1_args, cmd2_args):
    """Execute two commands connected by a pipe
    
    Python's subprocess handles the low-level pipe details for us.
    Under the hood, it uses the same fork/exec/pipe model as C.
    """
    # First process: run cmd1 and capture its output
    p1 = subprocess.Popen(
        cmd1_args,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Second process: takes p1's stdout as stdin
    p2 = subprocess.Popen(
        cmd2_args,
        stdin=p1.stdout,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Allow p1 to receive SIGPIPE if p2 exits
    p1.stdout.close()
    
    # Get output from p2
    output, errors = p2.communicate()
    return output.decode()

# Example: ls | grep .py
result = execute_pipe(['ls', '-la'], ['grep', '.py'])
print(result)`,
                cpp: `#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <unistd.h>
#include <sys/wait.h>
using namespace std;

void executePipe(vector<string>& cmd1, vector<string>& cmd2) {
    int pipefd[2];
    pipe(pipefd);  // Create pipe
    
    pid_t pid1 = fork();
    if (pid1 == 0) {
        // First command: write to pipe
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]);
        
        vector<char*> argv;
        for (auto& a : cmd1) argv.push_back(&a[0]);
        argv.push_back(nullptr);
        execvp(argv[0], argv.data());
        exit(1);
    }
    
    pid_t pid2 = fork();
    if (pid2 == 0) {
        // Second command: read from pipe
        close(pipefd[1]);
        dup2(pipefd[0], STDIN_FILENO);
        close(pipefd[0]);
        
        vector<char*> argv;
        for (auto& a : cmd2) argv.push_back(&a[0]);
        argv.push_back(nullptr);
        execvp(argv[0], argv.data());
        exit(1);
    }
    
    close(pipefd[0]);
    close(pipefd[1]);
    waitpid(pid1, nullptr, 0);
    waitpid(pid2, nullptr, 0);
}`,
            },
            explanation: `## Pipes connect stdout of one process to stdin of another.

\`\`\`
ls --> [pipe] --> grep
\`\`\`

**dup2()** redirects file descriptors.`,
            tips: ["Close unused pipe ends", "Parent must close both ends"],
        },
    ],
};

export const httpServerProject: Project = {
    id: "http-server",
    title: "HTTP Server from Scratch",
    act: 2,
    difficulty: "Intermediate",
    estimatedHours: 8,
    description: "Build a working HTTP server using raw sockets.",
    learningOutcomes: [
        "Understand TCP sockets",
        "Parse HTTP requests",
        "Serve static files",
    ],
    prerequisites: ["Networks basics", "Python"],
    technologies: ["Python"],
    steps: [
        {
            id: "step-1",
            title: "TCP Socket Server",
            description: "Create a basic TCP server that accepts connections.",
            concepts: ["socket", "bind", "listen", "accept"],
            code: {
                python: `import socket

def create_server(host='127.0.0.1', port=8080):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((host, port))
    server.listen(5)
    print(f"Server listening on {host}:{port}")
    
    while True:
        client, addr = server.accept()
        print(f"Connection from {addr}")
        
        request = client.recv(1024).decode()
        print(f"Request:\\n{request[:200]}")
        
        response = "HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n<h1>Hello!</h1>"
        client.send(response.encode())
        client.close()

if __name__ == "__main__":
    create_server()`,
            },
            explanation: `## Socket Programming

1. **socket()** - Create endpoint
2. **bind()** - Assign address
3. **listen()** - Mark as passive
4. **accept()** - Wait for connection`,
            tips: ["Use SO_REUSEADDR to avoid 'address in use'", "Always close client sockets"],
        },
        {
            id: "step-2",
            title: "HTTP Request Parsing",
            description: "Parse HTTP requests and route to handlers.",
            concepts: ["HTTP protocol", "request parsing", "routing"],
            code: {
                python: `def parse_request(request):
    lines = request.split('\\r\\n')
    method, path, _ = lines[0].split(' ')
    
    headers = {}
    for line in lines[1:]:
        if ': ' in line:
            key, val = line.split(': ', 1)
            headers[key] = val
    
    return {'method': method, 'path': path, 'headers': headers}

def handle_request(request):
    parsed = parse_request(request)
    path = parsed['path']
    
    if path == '/':
        return "HTTP/1.1 200 OK\\r\\n\\r\\n<h1>Home</h1>"
    elif path == '/about':
        return "HTTP/1.1 200 OK\\r\\n\\r\\n<h1>About</h1>"
    else:
        return "HTTP/1.1 404 Not Found\\r\\n\\r\\n<h1>404</h1>"`,
            },
            explanation: `## HTTP Request Format
\`\`\`
GET /path HTTP/1.1
Host: localhost
Content-Type: text/html

[body]
\`\`\``,
            tips: ["Split on \\r\\n for headers", "First line has method, path, version"],
        },
    ],
};
