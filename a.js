// E-Commerce 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct Node{
    char id[11];
    int money;
    struct Node* leftChild;
    struct Node* rightChild;
    struct Node* sub;
}Node;

Node *root[100000];

Node* makeNode(char* id, int money){
    Node* p = (Node*)malloc(sizeof(Node));
    p->money = money;
    strcpy(p->id, id);
    p->leftChild = NULL;
    p->rightChild = NULL;
    p->sub = NULL;
    return p;
}

Node* findBST(char* id, Node* r){
    if(r == NULL) return NULL;
    int c = strcmp(r->id, id);
    if(c == 0) return r;
    else if(c < 0){
        return findBST(id, r->rightChild);
    }
    else{
        return findBST(id, r->leftChild);
    }
}

Node* insertBST(char *id, int money, Node* r){
    if(r == NULL) return makeNode(id, money);
    int c = strcmp(r->id, id);
    if(c == 0){
        r->money += money;
        return r;
    }
    else if(c < 0){
        r->rightChild = insertBST(id, money, r->rightChild);
        return r;
    }
    else{
        r->leftChild = insertBST(id, money, r->leftChild);
        return r;
    }
}

int hashFunction(char *id){
    int code = 0;
    int l = strlen(id);
    for(int i = 0; i < l; i++){
        code = (code * 256 + id[i]) % 100000;
    }
    return code;
}

Node *find(char* id){
    int index = hashFunction(id);
    Node *p = findBST(id, root[index]);
    return p;
}

void insertNode(char *id, int money){
    int index = hashFunction(id);
    root[index] = insertBST(id, money, root[index]);
}

int hashTime(char *time){
    int hour = (time[0] - '0') * 10 + time[1] - '0';
    int minute = (time[3] - '0') * 10 + time[4] - '0';
    int second = (time[6] - '0') * 10 + time[7] - '0';
    return hour * 3600 + minute * 60 + second;
}

int main(){
    char customerID[11];
    char shopID[11];
    char productID[11];
    char timePoint[11];
    int money;
    int total = 0; // total_revenue
    int n = 0; // total_number_orders
    char cmd[50];
    int a[86401]; 
    int t[86401];
    for(int i = 0; i < 86401; i++){
        a[i] = 0;
        t[i] = 0;
    }

    while(1){
        scanf("%s", customerID);
        if(strcmp(customerID, "#") == 0){
            break;
        }
        else{
            scanf("%s %d %s %s", productID, &money, shopID, timePoint);
            insertNode(shopID, money);
            Node* tmp = find(shopID);
            tmp->sub = insertBST(customerID, money, tmp->sub);
            n++;
            total += money;
            int k = hashTime(timePoint);
            a[k] = a[k] + money;
        }
    }

    for(int i = 1; i < 86401; i++){
        t[i] = t[i-1] + a[i];
    }

    while(1){
        scanf("%s", cmd);
        if(strcmp(cmd, "?total_number_orders") == 0){
            printf("%d\n", n);
        }
        if(strcmp(cmd, "?total_revenue") == 0){
            printf("%d\n", total);
        }
        if(strcmp(cmd, "?revenue_of_shop") == 0){
            scanf("%s", shopID);
            Node* p = find(shopID);
            if(p != NULL){
                printf("%d\n", p->money);
            }
            else{
                printf("0\n");
            }
        }
        if(strcmp(cmd, "?total_consume_of_customer_shop") == 0){
            scanf("%s %s", customerID, shopID);
            Node *p = find(shopID);
            if(p != NULL){
                Node *q = findBST(customerID, p->sub);
                if(q != NULL){
                    printf("%d\n", q->money);
                }
                else{
                    printf("0\n");
                }
            }
            else{
                printf("0\n");
            }
        }
        if(strcmp(cmd, "?total_revenue_in_period") == 0){
            char start[11], end[11];
            scanf("%s %s", start, end);
            printf("%d\n", t[hashTime(end)] - t[hashTime(start) - 1]);
        }
        if(strcmp(cmd, "#") == 0){
            break;
        }
    }
}
