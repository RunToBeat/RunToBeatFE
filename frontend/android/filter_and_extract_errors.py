import re
from datetime import datetime

def filter_logs(input_file, output_file, start_time):
    try:
        start_time_dt = datetime.strptime(start_time, '%m-%d %H:%M:%S.%f')

        with open(input_file, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        with open(output_file, 'w', encoding='utf-8') as file:
            start_time_found = False

            for line in lines:
                match = re.match(r'(\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})', line)
                if match:
                    log_time_str = match.group(1)
                    log_time_dt = datetime.strptime(log_time_str, '%m-%d %H:%M:%S.%f')

                    if log_time_dt >= start_time_dt:
                        start_time_found = True

                if start_time_found:
                    file.write(line)

        print(f'Logs after {start_time} have been saved to {output_file}')

    except Exception as e:
        print(f'An error occurred: {e}')

def extract_errors(input_file, output_file):
    try:
        error_patterns = ["ERROR", "Exception", "fail"]  # 여기에 추가적인 에러 패턴을 넣을 수 있습니다.

        with open(input_file, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        with open(output_file, 'w', encoding='utf-8') as file:
            for line in lines:
                if any(pattern in line for pattern in error_patterns):
                    file.write(line)

        print(f'Errors have been saved to {output_file}')

    except Exception as e:
        print(f'An error occurred: {e}')

# 첫 번째 단계: 시간 이후의 로그 필터링
input_file = 'log.txt'
filtered_file = 'filtered_log.txt'
start_time = '07-22 17:33:30.772'  # 원하는 시작 시간

filter_logs(input_file, filtered_file, start_time)

# 두 번째 단계: 에러 메시지 추출
errors_file = 'errors_log.txt'

extract_errors(filtered_file, errors_file)
