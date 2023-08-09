//25 25
#include<stdio.h>

#include<string.h>

#include<stdlib.h>

#define N 1000007
typedef struct Node {
  char pro[5];
  int point;
  struct Node * next;
}
Node;

int max(int a, int b) {
  if (a > b) return a;
  else return b;
}

Node * a[N];

Node * makenode(char s[], int point) {
  Node * p = (Node * ) malloc(sizeof(Node));
  p -> next = NULL;
  p -> point = point;
  strcpy(p -> pro, s);
  return p;
}

Node * findnode(Node * h, char s[]) {
  for (Node * p = h; p != NULL; p = p -> next) {
    if (strcmp(p -> pro, s) == 0) {
      return p;
    }
  }
  return NULL;
}

Node * insert(Node * h, char s[], int point) {
  Node * q = makenode(s, point);
  Node * m = findnode(h, s);
  if (m != NULL) {
    if (m -> point < point) m -> point = point;
    return h;
  }
  Node * p = h;
  if (h == NULL) {
    //    	printf("pro = %s\n",q->pro);
    return q;
  }
  while (p -> next != NULL) {
    p = p -> next;
  }
  p -> next = q;
  //    printf("%s\n",h->name);
  return h;
}

int hash(char s[]) {
  long long ans = 0;
  long long x;
  ans = 0;
  long long power = 1;
  for (int j = strlen(s) - 1; j > -1; j--) {
    ans = ans + (long long) s[j] * power;
    ans = ans % N;
    power = (power * 256) % N;
  }
  return ans % N;
}
int error[N];

int T[24 * 3600 + 1];
int mark[24 * 3600 + 1];

int total = 0, err = 0;
int main() {
  // 	freopen("1.input","r",stdin);
  char user[11], problem[5], sta[5], c;
  int time, gio, phut, giay, point;
  while (1) {
    scanf("%s", user);
    if (strcmp(user, "#") == 0) break;
    total++;
    scanf("%s", problem);
    scanf("%d %c %d %c %d", & gio, & c, & phut, & c, & giay);
    time = gio * 3600 + phut * 60 + giay;
    mark[time]++;
    scanf("%s %d", sta, & point);
    int h = hash(user);
    if (strcmp(sta, "ERR") == 0) {
      error[h]++;
      err++;
    } else {
      a[h] = insert(a[h], problem, point);
    }
    //		printf("%s %s %d %s %d\n",user,problem,time,sta,point);
  }
  T[0] = 0;
  for (int i = 1; i < 24 * 3600; i++) {
    T[i] = T[i - 1] + mark[i];
  }
  while (1) {
    char cmd[30];
    scanf("%s", cmd);
    if (strcmp(cmd, "#") == 0) break;
    else if (strcmp(cmd, "?total_number_submissions") == 0) {
      printf("%d\n", total);
    } else if (strcmp(cmd, "?number_error_submision") == 0) {
      printf("%d\n", err);
    } else if (strcmp(cmd, "?number_error_submision_of_user") == 0) {
      scanf("%s", user);
      int h = hash(user);
      printf("%d\n", error[h]);
    } else if (strcmp(cmd, "?total_point_of_user") == 0) {
      scanf("%s", user);
      int h = hash(user);
      if (a[h] == NULL) printf("0\n");
      else {
        int total_point = 0;
        Node * m = a[h];
        while (m != NULL) {
          total_point += m -> point;
          m = m -> next;
        }
        printf("%d\n", total_point);
      }
    } else if (strcmp(cmd, "?number_submission_period") == 0) {
      scanf("%d %c %d %c %d", & gio, & c, & phut, & c, & giay);
      int start = gio * 3600 + phut * 60 + giay;
      scanf("%d %c %d %c %d", & gio, & c, & phut, & c, & giay);
      int end = gio * 3600 + phut * 60 + giay;
      int dem = T[end] - T[start - 1];
      printf("%d\n", dem);
    }
  }
  return 0;
}
