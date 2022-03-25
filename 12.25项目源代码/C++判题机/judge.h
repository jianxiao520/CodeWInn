#include <string>
#define FILE_SIZE 10
#define MB 1048576
#define CHECK_ROOT false
#define LOG false

using namespace std;
namespace JUDGE_CONF
{
	int COMPILE_TIME_LIMIT = 10000; // 编译时间限制 (ms)

	// ------------------------常量------------------------

	// 结果代码
	const int PROCEED = 0; // 已经处理并且正确运行退出
	const int CE = 1;	   // 编译错误
	const int TLE = 2;	   // 超时
	const int OLE = 4;	   // 输出文件超过大小限制
	const int RE = 5;	   // 运行时错误，包括数组越界、非法调用等
	const int WA = 6;	   // 答案错误
	const int AC = 7;	   // 答案正确
	const int PE = 8;	   // 输出格式错误
	const int SE = 9;	   // System Error，判题过程发生故障

	//语言相关常量
	const char *languages[] = {"Unknown", "C", "C++", "Java", "python"};
	const int LANG_UNKNOWN = 0;
	const int LANG_C = 1;
	const int LANG_CPP = 2;
	const int LANG_JAVA = 3;
	const int LANG_PYTHON = 4;

	const int GCC_COMPILE_ERROR = 1; //编译错误

	//退出原因
	const int EXIT_OK = 0;				  //正常退出
	const int EXIT_UNPRIVILEGED = 1;	  //缺乏权限退出
	const int EXIT_BAD_PARAM = 3;		  //参数错误退出
	const int EXIT_VERY_FIRST = 4;		  //judge程序运行超时退出
	const int EXIT_COMPILE = 6;			  //编译错误退出
	const int EXIT_PRE_JUDGE = 9;		  //预处理错误退出，如文件无法打开，无法fork进程等
	const int EXIT_PRE_JUDGE_PTRACE = 10; //ptrace运行错误退出
	const int EXIT_PRE_JUDGE_EXECLP = 11; //execlp运行错误退出
	const int EXIT_SET_LIMIT = 15;		  //设置时间限制错误退出
	const int EXIT_SET_SECURITY = 17;	  //设置安全限制错误退出
	const int EXIT_JUDGE = 21;			  //程序调用错误退出
	const int EXIT_COMPARE = 27;
	const int EXIT_COMPARE_SPJ = 30;
	const int EXIT_COMPARE_SPJ_FORK = 31;
	const int EXIT_TIMEOUT = 36;  //超时退出
	const int EXIT_UNKNOWN = 127; //不详

}

namespace PROBLEM
{
	int lang = 0;				 //待评测的程序语言
	int time_limit = 1000;		 //MS
	int memory_limit = 65535;	 //KB
	int output_limit = 1024000;	 //KB，输出文件的大小限制
	int result = JUDGE_CONF::PROCEED; //结果代号
	int time_usage = 0;			 //时间使用量
	int samples_count = 0;		 //测试样例数量
	struct DirList *dirs;
	string extra_message; //额外信息
	string status;		  //最终结果

	string code_path;	  //待评测的代码路径
	string code_id;		  // 提交代码的编号
	string inoutput_path; // 样例输入输出路径
	string custom_input;

	string exec_output;	   //待评测代码的输出文件
	char *spj_exec_file;   //SpecialJudge的可执行程序
	char *spj_output_file; //SpecialJudge的输出文件
	string result_file;	   //最终评判结果文件
	string error_file;	   //用户错误结果文件
	string run_dir;		   //沙盒的路径，即所有运行过程所在的文件夹

	char *stdout_file_compiler; //编译的输出
	char *stderr_file_compiler; //编译错误信息

	// 文件列表结构题
	struct DirList
	{
		string inPath;
		string outPath;
	};
}
string readFileIntoString(string filename);

string sampleOutPut(string HeadTitle, string filePath);

int checkResult(string dataOutPath, string userOutPath);

string get_extension(string file_name);

void KeepNum(char *str);

void parse_arguments(int argc, char *argv[]);

void output_result();

void compile();

void judge();

void read_Sample();

void io_redirect(string userinPath);

void set_limit(int TimeLimit);