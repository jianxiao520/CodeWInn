//
//  main.c
//  Fork
//
//  Created by 黄泽旭 on 2021/12/1.
//

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
// 子进程相关
#include <unistd.h>
// 系统资源限制
#include <sys/resource.h>
// ...
#include <string>
// 跟踪
#include <sys/ptrace.h>
// 系统信号常量
#include <sys/types.h>
#include <signal.h>
// 信号时钟
#include <sys/wait.h>
// 文件操作
#include <fstream>
#include <sstream>
// 文件夹操作
#include <dirent.h>
// 头文件
#include "judge.h"

using namespace std;

/*
 * 函数功能：读入文件数据至string
 * 返回值：文件内容
 */
string readFileIntoString(string filename)
{
  ifstream ifile(filename);
  //将文件读入到ostringstream对象buf中
  ostringstream buf;
  char ch;
  while (buf && ifile.get(ch))
    buf.put(ch);
  //返回与流对象buf关联的字符串
  return buf.str();
}

/*
 * 函数功能：封装输出测试用例格式
 * 函数参数：
 *  HeadTitle: 头部信息
 *  filePath: 文件路径
 * 返回值：格式化后内容
 */
string sampleOutPut(string HeadTitle, string filePath)
{
  return "---------" + HeadTitle + "---------\n" +
         readFileIntoString(filePath) +
         "\n-------------------------\n";
}

/*
 * 函数功能：对比结果
 * 函数参数：
 *  dataOutPath：样例数据
 *  userOutPath：用户数据
 * 返回值：JUDGE_CONF::AC 成功、JUDGE_CONF::OLE 超出输出限制、JUDGE_CONF::WA 答案错误
 */
int checkResult(string dataOutPath, string userOutPath)
{
  ifstream dout(dataOutPath);
  ifstream uout(userOutPath);
  string line;
  string dataOut = "";
  string userOut = "";

  // 处理测试样例
  while (getline(dout, line))
  {
    int index = 0;
    string lineContent;

    // 判断行首位字符是否为换行符 -> 空行判断
    if ((int)line.c_str()[0] == 13)
      continue;

    // 判断为空字符与换行符
    while ((int)line.c_str()[index] != 13 && (int)line.c_str()[index] != 0)
      lineContent += line.c_str()[index++];
    dataOut += lineContent + "\n";
  }

  // 处理用户输出
  while (getline(uout, line))
  {
    int index = 0;
    string lineContent;

    // 判断行首位字符是否为换行符 -> 空行判断

    if ((int)line.c_str()[0] == 13)
      continue;

    // 判断为空字符与换行符
    while ((int)line.c_str()[index] != 13 && (int)line.c_str()[index] != 0)
      lineContent += line.c_str()[index++];
    userOut += lineContent + "\n";
  }

  // 比较
  int dLen = dataOut.length();
  int uLen = userOut.length();
  int result = JUDGE_CONF::AC;
  if (uLen >= (dLen << 1) + 1024)
    result = JUDGE_CONF::OLE; // 输出超出限制
  else if (uLen != dLen || dataOut.compare(userOut) != 0)
    result = JUDGE_CONF::WA;
  return result;
}

/*
 * 函数功能：取文件后缀
 * 函数参数：
 *  file_name：地址路径
 *  extension：返回后缀
 * 返回值：(void)
 */
string get_extension(string file_name)
{
  int i = 0, length;
  length = file_name.length();
  while (file_name[i])
  {
    if (file_name[i] == '.')
      break;
    i++;
  }
  if (i < length)
    return file_name.substr(i + 1, length - i);
  return "\0";
}

/*
 * 函数功能：保留字符串中的数字
 * 返回值：(void)
 */
int KeepNum(string str)
{
  int i = 0;
  int j = 0;
  while (str[i] != '\0')
  {
    if (str[i] >= '0' && str[i] <= '9')
      str[j++] = str[i];
    i++;
  }
  str[j] = '\0';
  return atoi(str.c_str());
}

/*
 * 函数功能：解析传入参数
 * 函数参数：
 *  argc：对应main函数的argc，即传入的头命令
 *  argv：对应main函数的grgv[]，即传入的命令参数
 * 返回值：(void)
 */
void parse_arguments(int argc, char *argv[])
{
  int opt;
  extern char *optarg;

  while ((opt = getopt(argc, argv, "c:d:l:t:r:e:s:")) != -1)
  {
    switch (opt)
    {
    case 'c': // 传进来的用户代码路径，可以直接对需要判题的代码进行编译、运行操作。
      PROBLEM::code_path = optarg;
      break;
    case 'd': // 提交任务代码的ID串，用来保存用户输出数据。
      PROBLEM::code_id = optarg;
      break;
    case 'l': // 语言运行环境；1: C语言、2: C++语言、3: Python...。
      PROBLEM::lang = atoi(optarg);
      break;
    case 't': // 时间限制，指实际运行的时间，包括I/O等待时间
      PROBLEM::time_limit = atoi(optarg);
      break;
    case 'r': // 运行代码的目录，结果存放的位置
      PROBLEM::run_dir = optarg;
      break;
    case 'e': // 题目样例目录位置，自动读取目录下所有的题目
      PROBLEM::inoutput_path = optarg;
      break;
    case 's': // 用户自定义输入的文件路径
      PROBLEM::custom_input = optarg;
      break;
    default:
      printf("遇到没有定义的参数! \n");
      exit(JUDGE_CONF::EXIT_BAD_PARAM);
    }
  }
  PROBLEM::exec_output = PROBLEM::run_dir + "/" + PROBLEM::code_id + ".out";
  PROBLEM::error_file = PROBLEM::run_dir + "/" + PROBLEM::code_id + ".error";
  PROBLEM::result_file = PROBLEM::run_dir + "/" + PROBLEM::code_id + ".result";
}

/*
 * 函数功能：输出判题结果到结果文件 （程序结束前执行的函数）
 * 返回值：(void)
 */
void output_result()
{
  FILE *result_file = fopen(PROBLEM::result_file.c_str(), "w");
  printf("%d", PROBLEM::result);
  switch (PROBLEM::result)
  {
  case 0:
    PROBLEM::status = "Compile Success";
    break;
  case 1:
    PROBLEM::status = "Compile Error";
    break;
  case 2:
    PROBLEM::status = "Time Limit Exceeded";
    break;
  case 3:
    PROBLEM::status = "Memory Limit Exceeded";
    break;
  case 4:
    PROBLEM::status = "Output Limit Exceeded";
    break;
  case 5:
    PROBLEM::status = "Runtime Error";
    break;
  case 6:
    PROBLEM::status = "Wrong Answer";
    break;
  case 7:
    PROBLEM::status = "Accepted";
    break;
  case 8:
    PROBLEM::status = "Presentation Error";
    break;
  default:
    PROBLEM::status = "System Error";
    break;
  }
  fprintf(result_file, "%s\n", PROBLEM::status.c_str());
  fprintf(result_file, "%d\n", PROBLEM::time_usage);
  fprintf(result_file, "%s\n", PROBLEM::extra_message.c_str());

  cout << "运行结果->" << PROBLEM::status << endl;
}

/*
 * 函数功能：用户代码编译
 * 返回值：(void)
 */
void compile()
{
  // 判断是否为解析型语言
  if (PROBLEM::lang == JUDGE_CONF::LANG_PYTHON)
  {
    return;
  }

  int time_limit = 6;
  string RunPath = PROBLEM::run_dir + "/" + PROBLEM::code_id;
  const char *COMP_C[] = {"g++", "-Wall", "-lm", PROBLEM::code_path.c_str(), "-o", RunPath.c_str(), NULL};
  
  pid_t pid = fork();
  if (pid == -1)
  {
    printf("Error:\n");
    exit(JUDGE_CONF::EXIT_PRE_JUDGE);
  }
  else if (pid != 0)
  { // parent
    int status;
    waitpid(pid, &status, 0);
    if (status == -1)
    {
      printf("编译异常");
      exit(JUDGE_CONF::EXIT_COMPILE);
    }

    if (WIFEXITED(status))
    {
      //编译程序自行退出
      if (EXIT_SUCCESS == WEXITSTATUS(status))
      {
        PROBLEM::result = JUDGE_CONF::PROCEED;
        printf("compile succeeded.\n");
      }
      else if (JUDGE_CONF::GCC_COMPILE_ERROR == WEXITSTATUS(status))
      {
        //编译错误
        printf("compile error\n");
        PROBLEM::result = JUDGE_CONF::CE;
        exit(JUDGE_CONF::EXIT_OK);
      }
      else
      {
        printf("Unknown error occur when compiling the source code.Exit status %d\n", WEXITSTATUS(status));
        exit(JUDGE_CONF::EXIT_COMPILE);
      }
    }
    else
    {
      //编译程序被终止
      if (WIFSIGNALED(status))
      {
        PROBLEM::result = JUDGE_CONF::CE;
        if (SIGALRM == WTERMSIG(status))
        {
          printf("Compile time out\n");
          PROBLEM::extra_message = "Compile Out of Time Limit";
          exit(JUDGE_CONF::EXIT_TIMEOUT);
        }
        else
        {
          printf("Unknown signal when compile the source code.\n");
          PROBLEM::extra_message = "Unknown signal!";
          exit(JUDGE_CONF::EXIT_UNKNOWN);
        }
      }
      else if (WIFSTOPPED(status))
      {
        printf("The compile process stopped by signal\n");
        PROBLEM::extra_message = "The compile process stopped by signal!";
      }
      else
      {
        printf("I don't kwon why the compile process stopped\n");
        PROBLEM::extra_message = "Unknown signal!";
      }
      exit(JUDGE_CONF::EXIT_COMPILE);
    }
    // return status;
  }
  else
  { // child
    // 设置编译时的资源限制
    struct rlimit lim;
    lim.rlim_cur = lim.rlim_max = time_limit;
    // 设置CPU运行时间
    setrlimit(RLIMIT_CPU, &lim);
    // 设置实际运行时间 -> 定时器
    alarm(0);
    alarm(time_limit);

    // ...

    // 重定向此子进程的错误输出到文件
    freopen(PROBLEM::error_file.c_str(), "w", stderr);
    execvp(COMP_C[0], (char *const *)COMP_C);
    exit(0);
  }
}

/*
 * 函数功能：判题主函数
 * 返回值：(void)
 */
void judge()
{
  // ... 获取最大时间以及空间
  struct rusage rused;

  printf("Samples COUNT:%d\n", PROBLEM::samples_count);

  // 取出需要循环执行的数量
  for (int i = 0; i < PROBLEM::samples_count; i++)
  {
    string userInPath, userOutPath; // 重定向输入输出路径

    if (PROBLEM::custom_input.empty() || PROBLEM::custom_input.size() == 0)
    {
      userInPath = PROBLEM::dirs[i + 1].inPath;
      userOutPath = PROBLEM::dirs[i + 1].outPath;
    }
    else
    {
      userInPath = PROBLEM::custom_input;
    }

    // 运行程序
    pid_t pidRun = fork();
    if (pidRun == 0)
    { // child
      // 运行时间限制
      set_limit(PROBLEM::time_limit);
      // 输入输出重定向
      // printf("%s", userInPath.c_str());
      io_redirect(userInPath);
      printf("重定向结束");
      // 解析型语言
      if (PROBLEM::lang == JUDGE_CONF::LANG_PYTHON)
      {
        string command = PROBLEM::run_dir + "/" + PROBLEM::code_id + ".py";
        printf("%s %s\n", JUDGE_CONF::languages[JUDGE_CONF::LANG_PYTHON], command.c_str());
        execlp(
            JUDGE_CONF::languages[JUDGE_CONF::LANG_PYTHON],
            JUDGE_CONF::languages[JUDGE_CONF::LANG_PYTHON], command.c_str(), NULL);
      }
      else
      {
        string command = PROBLEM::run_dir + "/" + PROBLEM::code_id;
        execl(command.c_str(), command.c_str(), NULL);
      }
      printf("出错？");
      exit(JUDGE_CONF::EXIT_PRE_JUDGE_EXECLP);
    }
    else
    {

      // 监视时间空间...
      int status;
      wait4(pidRun, &status, 0, &rused);

      // 收到信号
      if (status != 0)
        printf("程序运行错误信号❕: %d\n", status);

      //自行退出
      if (WIFEXITED(status))
      {
        if (WEXITSTATUS(status) == EXIT_SUCCESS)
        // 正常运行
        {

          PROBLEM::time_usage += (rused.ru_utime.tv_sec * 1000 +
                                  rused.ru_utime.tv_usec / 1000);
          PROBLEM::time_usage += (rused.ru_stime.tv_sec * 1000 +
                                  rused.ru_stime.tv_usec / 1000);
          printf("It takes %dms\n", PROBLEM::time_usage);

          // 用户自定义输入不需要比对输出
          if (!PROBLEM::custom_input.empty() || PROBLEM::custom_input.size() != 0)
            break;

          // 用户输出与标准输出比对
          int result = checkResult(userOutPath.c_str(), PROBLEM::exec_output.c_str());
          // 标记状态
          PROBLEM::result = result;

          printf("【测试样例%d 】Result:%d\n", i, result);

          if (PROBLEM::result != JUDGE_CONF::AC)
          {
            // 返回前端告知用户错误的样例详情
            PROBLEM::extra_message =
                "_测试用例(" + to_string(i) + ")->\n" +
                sampleOutPut("测试用例", userInPath) +
                sampleOutPut("标准输出", userOutPath) +
                sampleOutPut("您的输出", PROBLEM::exec_output);
            break;
          }
        }
        else
        // 运行时错误，包括数组越界、非法调用等
        {
          PROBLEM::result = JUDGE_CONF::RE;
        }
      }

      //被信号终止掉了
      if (WIFSIGNALED(status) ||
          (WIFSTOPPED(status) && WSTOPSIG(status) != SIGTRAP))
      { //要过滤掉SIGTRAP信号
        int signo = 0;
        signo = WIFSIGNALED(status) ? WTERMSIG(status) : WSTOPSIG(status);
        switch (signo)
        {
        case SIGALRM: // 超出定时器
          printf("超时～\n");
          PROBLEM::time_usage = 0;
          PROBLEM::result = JUDGE_CONF::TLE;
          break;
        case SIGXFSZ:
          printf("超出文件限制\n");
          PROBLEM::time_usage = 0;
          PROBLEM::result = JUDGE_CONF::OLE;
          break;
        default:
          printf("不知道哪里出问题\n");
          PROBLEM::time_usage = 0;
          PROBLEM::result = JUDGE_CONF::RE;
          break;
        }
        ptrace(PT_KILL, pidRun, NULL, 0);
        printf("%d", signo);
      }
    }
  }

  if (PROBLEM::result == JUDGE_CONF::WA)
    cout << PROBLEM::extra_message << endl;
}

/*
 * 函数功能：读入题目数据至结构体
 * 返回值：(void)
 */
void read_Sample()
{
  // 目录
  DIR *dir;
  struct dirent *ptr;
  // 文件后缀
  string extent;
  // 文件结构体数组申请内存 (大于20个文件可能会出错)
  PROBLEM::dirs = (struct PROBLEM::DirList *)malloc(sizeof(struct PROBLEM::DirList) * 20);
  dir = opendir(PROBLEM::inoutput_path.c_str());
  char *name = (char *)malloc(sizeof(dir));

  // 分析目录文件数量存入至结构体数组
  while ((ptr = readdir(dir)) != NULL)
  {
    // 获取整个文件名
    string s_Num = ptr->d_name;
    // 文件名仅保留数字
    int i_Num = KeepNum(s_Num);
    // 文件名取后缀
    extent = get_extension(ptr->d_name);
    // 判断序号合理
    if (i_Num > 0)
    {
      // in 输入、out 输出
      if (extent[0] == 'i')
        // 输入文件
        PROBLEM::dirs[i_Num].inPath = PROBLEM::inoutput_path + "/" + (string)ptr->d_name;
      else
        // 输出文件
        PROBLEM::dirs[i_Num].outPath = PROBLEM::inoutput_path + "/" + (string)ptr->d_name;

      // 记录文件数量 （有且仅当结构体成员中的所有子成员不为空时才加1）
      if (PROBLEM::dirs[i_Num].inPath.empty() == false &&
          PROBLEM::dirs[i_Num].outPath.empty() == false)
        PROBLEM::samples_count++;
    }
  }
  // 关闭连接
  closedir(dir);
}

/*
 * 函数功能：输入输出重定向
 * 返回值：(void)
 */
void io_redirect(string userinPath)
{

  stdin = freopen(userinPath.c_str(), "r", stdin);
  stdout = freopen(PROBLEM::exec_output.c_str(), "w", stdout);
  stderr = freopen(PROBLEM::error_file.c_str(), "w", stderr);

  if (stdin == NULL || stdout == NULL || stderr == NULL)
  {
    exit(JUDGE_CONF::EXIT_PRE_JUDGE);
  }
}

/*
 * 函数功能：限定题目消耗的资源
 * 返回值：(void)
 */
void set_limit(int TimeLimit)
{

  struct rlimit lim;

  // 限定CPU时间以及实际运行时间
  lim.rlim_cur = lim.rlim_max = TimeLimit + 1;
  setrlimit(RLIMIT_CPU, &lim);
  alarm(0);
  alarm(TimeLimit + 1);

  // 限定进程可以创建的最大文件大小
  lim.rlim_max = (FILE_SIZE << 20) + MB;
  lim.rlim_cur = FILE_SIZE << 20;
  setrlimit(RLIMIT_FSIZE, &lim);

  // 限定进程堆栈的最大大小，以字节为单位。
  lim.rlim_cur = lim.rlim_max = MB << 6;
  setrlimit(RLIMIT_STACK, &lim);
}

/*
 * 函数功能：主函数、流程控制
 */
int main(int argc, char *argv[])
{

  printf("开始\n");
  atexit(output_result); //退出程序时的回调函数，用于输出判题结果
  // 判断是否拥有管理员 权限
  if (CHECK_ROOT)
  {
    if (geteuid() != 0)
    {
      printf("No administrator privileges!\n");
      exit(0);
    }
  }

  // 解析传入的参数
  parse_arguments(argc, argv);

  if (PROBLEM::custom_input.empty() || PROBLEM::custom_input.size() == 0)
  {
    // 读入题目样例
    read_Sample();
  }
  else
  {
    // 用户自定义输入
    PROBLEM::samples_count = 1;
  }

  if (LOG)
  {
    printf("%s\n", PROBLEM::code_path.c_str());
    printf("%s\n", PROBLEM::code_id.c_str());
    printf("%d\n", PROBLEM::lang);
    printf("%d\n", PROBLEM::time_limit);
  }

  printf("编译...\n");
  compile();

  judge();

  printf("执行结束");
  printf("\n");
  return 0;
}
