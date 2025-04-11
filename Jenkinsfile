pipeline {
    agent any

     environment {
        VERCEL_TOKEN = credentials('vercel-token') // Lưu token Vercel trong Jenkins Credentials
    }

    tools {
        nodejs 'NodeJS' // Đây là tên bạn đã cấu hình trong Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HaMinhLong/ReactJS_nha_thuoc_GPP'
            }
        }

        stage('Setup Environment') {
            steps {
                sh 'npm install -g vercel'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Cài đặt dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build ứng dụng React
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    // Triển khai chỉ với thư mục build
                    sh 'vercel --token $VERCEL_TOKEN --prod --yes --name nha-thuoc-gpp ./build'
                }
            }
        }
    }
}
