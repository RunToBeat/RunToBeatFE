import os

# 프로젝트 루트 디렉토리 경로를 설정합니다.
project_root = "C:/Users/Soyee/Desktop/Repository/RunToBeatFE/frontend"

# build.gradle 파일을 재귀적으로 검색하여 jcenter()를 mavenCentral()으로 대체합니다.
def replace_jcenter_in_build_gradle(root_dir):
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file == "build.gradle":
                file_path = os.path.join(subdir, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    file_data = f.read()
                if "jcenter()" in file_data:
                    file_data = file_data.replace("jcenter()", "mavenCentral()")
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(file_data)
                    print(f"Updated {file_path}")

# node_modules 디렉토리도 포함하여 변경 수행
replace_jcenter_in_build_gradle(project_root)
