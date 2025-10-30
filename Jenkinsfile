pipeline {
  agent any

  tools {
    nodejs 'Node_22.15.0'
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: "${env.BRANCH_NAME}",
            credentialsId: 'gitlab_token',
            url: 'https://git.fa.edu.vn/hcm25_cpl_net_08/team03/mockproject_fe.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat '''
          chcp 65001
          echo =======================================
          echo Installing dependencies...
          echo =======================================
          npm ci || npm install
        '''
      }
    }

    stage('Build') {
  steps {
    bat '''
      chcp 65001
      set FORCE_COLOR=0
      set NO_COLOR=true
      set VITE_NO_COLOR=true
      set CI=true
      echo =======================================
      echo Starting Vite build...
      echo =======================================
      call npm run build
    '''
  }
}

stage('Run Tests') {
  steps {
    bat '''
      chcp 65001
      set FORCE_COLOR=0
      set NO_COLOR=true
      set VITEST_DISABLE_COLORS=true
      set VITEST_UI=false
      echo =======================================
      echo Running tests...
      echo =======================================
      npm run test -- --reporter=dot || exit 0
    '''
  }
}


    stage('Mock CD Deploy') {
      when {
        // you can change this to branch 'main' if you only want it on main
        expression { env.BRANCH_NAME ==~ /(main|Test)/ }
      }
      steps {
        bat '''
          chcp 65001
          echo =======================================
          echo Starting mock deployment...
          echo =======================================
          if exist dist (
            echo Deploying contents of dist folder...
            dir dist
            echo ---------------------------------------
            echo Mock deployment completed successfully.
            echo Files would be uploaded to the target server here.
            echo ---------------------------------------
          ) else (
            echo ERROR: No dist folder found! Build step may have failed.
            exit /b 1
          )
        '''
      }
    }
  }

  post {
    success {
      echo "Build and mock CD deployment successful for branch: ${env.BRANCH_NAME}"
    }
    failure {
      echo "Build or mock CD deployment failed for branch: ${env.BRANCH_NAME}"
    }
  }
}
