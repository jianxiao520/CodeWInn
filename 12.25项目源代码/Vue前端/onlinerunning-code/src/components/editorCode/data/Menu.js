export default {
    Themes: [
        { key: "Mdn_Like", value: "mdn-like" },
        { key: "Xq_Light", value: "xq-light" },
        { key: "Twilight", value: "twilight" },
        { key: "Shadowfox", value: "shadowfox" },
        { key: "Rubyblue", value: "rubyblue" },
        { key: "Panda_Syntax", value: "panda-syntax" },
    ],
    TabLen: [
        { key: "2个空格", value: 2 },
        { key: "4个空格", value: 4 },
        { key: "8个空格", value: 8 }
    ],
    Lang: [
        {
            "lang": "C++",
            "snippet": `#include <iostream>\nusing namespace std;\n\nint main()\n{\n\tcout << "Hello, World!";\n\treturn 0;\n}`,
            "mode": "text/x-c++src"
        }, {
            "lang": "Java",
            "snippet": `public class MyCode {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`,
            "mode": "text/x-java"
        }, {
            "lang": "Python",
            "snippet": `def main():\n\tprint("HelloWorld")\n\nif __name__ == "__main__":\n\tmain()`,
            "mode": "text/x-python"
        }, {
            "lang": "C",
            "snippet": `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World !");\n\treturn 0;\n}`,
            "mode": "text/x-csrc"

        }, {
            "lang": "C#",
            "snippet": `class MyCode {\n\tstatic void Main() {\n\t\tSystem.Console.WriteLine("Hello World!");\n\t}\n}`,
            "mode": "text/x-csharp"
        }, {
            "lang": "JavaScript",
            "snippet": `(function main() {\n\tconsole.log("Hello World!");\n}());`,
            "mode": "text/javascript"
        }, {
            "lang": "Go",
            "snippet": `func main() {\n\tfmt.Printf("Hello, World!")\n}`,
            "mode": "text/x-go"
        }
    ]
}