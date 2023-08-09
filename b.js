// 23 25
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MODULOUID 5000
#define MODULOPID 4000

char userID[12], problemID[5], timePoint[12], status[10];

int point;

int total_number_submissions, number_error_submision, number_error_submision_of_user[MODULOUID + 5];
int point_of_user[MODULOUID + 5][MODULOPID + 5], total_point_of_user[MODULOUID + 5];

int a[500005];

int mappingUserID(const char *str) {
    int result = 0;
    
    for (int i = 0; str[i] != '\0'; i++) {
        result = (result * 10 + (str[i] - '0')) % MODULOUID;
    }
    
    return result;
}

int mappingpID(const char *str) {
    int result = 0;
    
    for (int i = 0; str[i] != '\0'; i++) {
        result = (result * 12 + (str[i] - '0')) % MODULOPID;
    }
    
    return result;
}

int timeToSeconds(const char *timeStr) {
    int hours, minutes, seconds;
    
    sscanf(timeStr, "%d:%d:%d", &hours, &minutes, &seconds);
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        printf("Thời gian không hợp lệ.\n");
        exit(1);
    }
    
    return hours * 3600 + minutes * 60 + seconds;
}

int main()
{
    while(1)
    {
        scanf("%s", userID);
        if (!strcmp(userID, "#"))
            break;
        scanf("%s%s%s%d", problemID, timePoint, status, &point);
        // printf("%s %s %s %s %d\n", userID, problemID, timePoint, status, point);
        total_number_submissions++;
        int uID = mappingUserID(userID);
        int pID = mappingpID(problemID);
        if (!strcmp(status, "ERR"))\
        {
            number_error_submision++;
            number_error_submision_of_user[uID]++;   
        }
        if (point > point_of_user[uID][pID])
        {
            total_point_of_user[uID] += point - point_of_user[uID][pID];
            point_of_user[uID][pID] = point;
        }
        a[timeToSeconds(timePoint)]++;
    }
    for(int i = 1; i<=100000; ++i) a[i] += a[i-1];
    char mtea[150];
    while(1)
    {
        scanf("%s", mtea);
        if (!strcmp(mtea, "#"))
            break;
            
        if (!strcmp(mtea, "?total_number_submissions")) 
            printf("%d\n", total_number_submissions);
            
        if (!strcmp(mtea, "?number_error_submision")) 
            printf("%d\n", number_error_submision);
            
        if (!strcmp(mtea, "?number_error_submision_of_user")) 
        {
            scanf("%s", userID);
            printf("%d\n", number_error_submision_of_user[mappingUserID(userID)]);
        }
        
        if (!strcmp(mtea, "?total_point_of_user"))
        {
            scanf("%s", userID);
            printf("%d\n", total_point_of_user[mappingUserID(userID)]);
        }
        
        if (!strcmp(mtea, "?number_submission_period"))
        {
            char startPoint[10], endPoint[10];
            scanf("%s%s", startPoint, endPoint);
            printf("%d\n", a[timeToSeconds(endPoint)] - a[timeToSeconds(startPoint) - 1]);
        }
    }
    return 0;
}
