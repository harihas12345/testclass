const questionsDB = {
    week1: {
        title: "Week 1: DevOps 2 - Part 1",
        subtitle: "CI/CD, Automated Testing, and Code Reviews",
        questions: [
            {
                id: 1,
                scenario: "Your development team is implementing a CI/CD pipeline for a microservices-based application. Unit tests pass in dev but integration issues frequently occur in production. The pipeline uses CodePipeline with CodeBuild for unit tests only. The application has five microservices communicating via REST APIs, and deployment failures have increased 40% over the past month.",
                question: "Which combination of actions would BEST address this situation? (Select TWO)",
                options: [
                    "Increase unit test frequency and add more test cases to achieve 100% code coverage across all microservices",
                    "Add an integration testing stage in CodePipeline that deploys services to a staging environment and runs API contract tests before production",
                    "Implement Amazon CodeGuru Reviewer to automatically review code changes and block deployments if critical issues are detected",
                    "Configure CodeBuild to run integration tests in parallel with unit tests to reduce overall pipeline execution time",
                    "Create a staging environment mirroring production and add a manual approval stage after integration testing"
                ],
                correct: ["B", "E"],
                multipleAnswers: true,
                explanation: "Integration testing in staging (B) catches issues unit tests miss, and a manual approval stage (E) provides oversight before production. More unit tests (A) won't catch integration issues, CodeGuru (C) focuses on code quality not integration, and parallel testing (D) doesn't add integration coverage."
            },
            {
                id: 2,
                scenario: "A financial services company is building a CI/CD pipeline for their payment processing application. Regulatory requirements mandate all code changes be reviewed for security vulnerabilities before deployment. The team deploys 50 code changes per day and manual security reviews are creating a bottleneck. They need actionable feedback within minutes of code commit.",
                question: "What is the MOST efficient approach to meet these requirements?",
                options: [
                    "Configure CodePipeline to trigger Lambda functions that run custom security scans, storing results in S3 for manual review",
                    "Implement Amazon CodeGuru Security to automatically scan code on every commit, integrate findings into pull requests, and fail builds on critical vulnerabilities",
                    "Set up CodeBuild to run OWASP dependency checks and SAST tools, then require manual security team approval before deployment stages",
                    "Use AWS Security Hub to aggregate security findings and create EventBridge rules to notify developers via SNS when issues are detected"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CodeGuru Security (B) provides automated fast scanning with immediate feedback in pull requests and can block deployments automatically. Option A requires manual review defeating automation, C still has manual bottleneck, and D aggregates findings but doesn't scan code."
            },
            {
                id: 3,
                scenario: "Your organization has CI/CD pipelines across 15 application teams. Testing practices are inconsistent: some teams only run unit tests, others skip tests during hotfixes, and coverage varies from 30% to 85%. Leadership wants minimum quality gates while allowing team flexibility. The goal is to prevent deployments that don't meet basic quality standards without creating excessive overhead.",
                question: "Which approach would BEST balance quality requirements with team autonomy?",
                options: [
                    "Mandate exactly 80% code coverage and configure CodeBuild to fail builds that don't meet this threshold with no exceptions",
                    "Create standards requiring minimum 60% coverage for unit tests and at least one integration test suite, implement checks in CodeBuild, and provide reusable buildspec templates",
                    "Implement CodeGuru Reviewer across all repositories with automatic blocking of pull requests that have critical issues",
                    "Establish a centralized testing team that reviews all code changes before deployment and maintains a shared test suite"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Option B provides reasonable minimum standards while giving teams flexibility and reusable templates to help them succeed. A is too rigid, C focuses on code review not testing standards, and D creates a bottleneck removing team autonomy."
            },
            {
                id: 4,
                scenario: "A SaaS company runs a multi-tenant application processing customer data through Lambda functions triggered by API Gateway. A recent deployment introduced a bug causing data processing failures for 20% of customers, undetected until customers reported problems. The team wants automated testing that validates the entire workflow before production deployment, including API endpoints, Lambda execution, and data processing accuracy.",
                question: "What testing strategy should be implemented in CodePipeline to catch such issues?",
                options: [
                    "Add a CodeBuild stage that runs unit tests for each Lambda function individually, mocking all external dependencies",
                    "Implement a testing stage that deploys to staging, runs end-to-end integration tests simulating real customer workflows, and validates data processing results before promoting to production",
                    "Configure AWS X-Ray tracing in production and use CloudWatch alarms to automatically roll back deployments when error rates exceed thresholds",
                    "Use CodeDeploy with canary deployment strategy to gradually roll out changes to 10% of customers first"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "End-to-end integration testing in staging (B) validates the complete workflow before production. Unit tests alone (A) won't catch integration issues, X-Ray (C) only detects issues after production deployment, and canary (D) still exposes some customers to bugs."
            },
            {
                id: 5,
                scenario: "Your team maintains a legacy monolithic application being refactored into microservices. The unit testing stage takes 45 minutes running tests sequentially for all 12 modules. The team deploys 3-4 times per day and the long testing duration is impacting productivity. Test failures in one module shouldn't block testing of other modules.",
                question: "How can you optimize the testing stage to reduce pipeline execution time while maintaining test reliability?",
                options: [
                    "Configure CodeBuild to use a larger compute instance type with more CPU and memory to speed up sequential test execution",
                    "Modify buildspec.yml to run tests for all 12 modules in parallel using CodeBuild batch builds, with each module tested in a separate build job",
                    "Reduce test cases by removing redundant tests and focusing only on critical path testing",
                    "Implement test result caching in CodeBuild so unchanged modules skip testing"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Parallel testing with batch builds (B) can reduce execution from 45 minutes to the duration of the longest single module test. Larger instances (A) provide marginal improvement, removing tests (C) reduces reliability, and caching (D) helps but doesn't address the fundamental sequential execution problem."
            },
            {
                id: 6,
                scenario: "A healthcare company is developing a patient management system requiring HIPAA compliance. The team of 8 developers creates 30 pull requests per week. Manual security reviews take 2-3 days creating delays. The company needs immediate security feedback while maintaining human oversight for critical changes.",
                question: "Which implementation would BEST meet these requirements?",
                options: [
                    "Configure CodeGuru Reviewer to automatically analyze pull requests for security issues and require security team approval only for high-severity findings",
                    "Implement Lambda functions triggered by CodeCommit events to run custom security scanning tools, blocking all pull requests by default",
                    "Use CodeBuild to run SAST tools on every commit, generate reports in S3, and send notifications to the security team via SNS",
                    "Deploy third-party code review tools on EC2 instances, integrate with CodeCommit webhooks, and maintain a queue for security team review"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CodeGuru Reviewer (A) provides immediate automated security feedback while allowing human oversight for high-severity issues, balancing speed and security. B blocks everything creating delays, C requires manual review of all reports, and D doesn't provide automation benefits."
            },
            {
                id: 7,
                scenario: "Your organization uses CodePipeline for a Node.js application. Management mandated all deployments must have at least 75% code coverage. Currently the pipeline deploys even when coverage is below threshold because the test stage only checks if tests pass, not coverage percentage. You need to enforce this without modifying application code.",
                question: "What is the MOST effective way to implement this requirement?",
                options: [
                    "Modify buildspec.yml in the test stage to parse the coverage report and fail the build if coverage is below 75%",
                    "Create a Lambda function that retrieves coverage reports from S3 and uses Step Functions to control whether the pipeline continues",
                    "Configure CloudWatch Events to monitor CodeBuild completion, trigger a Lambda to check coverage, and manually stop the pipeline if insufficient",
                    "Implement a manual approval stage after testing where reviewers check the coverage report before approving deployment"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Modifying buildspec.yml (A) is the most direct approach, failing the build immediately if coverage is insufficient. B and C add unnecessary complexity, while D reintroduces manual processes that slow deployment."
            },
            {
                id: 8,
                scenario: "A software company's CodePipeline experiences intermittent failures in the testing stage where integration tests fail due to timing issues when external services (payment gateway, inventory system) are slow to respond. Tests have a 5-second timeout that works 90% of the time but occasionally causes false failures. The external services are third-party APIs the team cannot modify.",
                question: "What approach would BEST improve test reliability?",
                options: [
                    "Increase the timeout to 30 seconds for all integration tests to accommodate slow external service responses",
                    "Implement retry logic in the test code with exponential backoff for external service calls, failing only after 3 consecutive failures",
                    "Remove integration tests that depend on external services from the pipeline and run them separately on a schedule",
                    "Mock all external service calls in the integration tests to eliminate dependency on third-party API response times"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Retry logic with exponential backoff (B) handles transient failures while still catching real issues. Option A might mask real performance issues, C reduces pipeline test coverage, and D defeats the purpose of integration testing."
            },
            {
                id: 9,
                scenario: "Your team is building a CI/CD pipeline for a Python Lambda application that processes S3 files and stores results in DynamoDB. A recent deployment caused production issues because the Lambda IAM role lacked DynamoDB write permissions, even though the function code was correct. The team wants to catch such configuration issues before production deployment.",
                question: "Which testing approach would BEST prevent this type of issue?",
                options: [
                    "Enhance unit tests to mock AWS service calls and verify the correct API methods are invoked with proper parameters",
                    "Add an integration testing stage that deploys Lambda to a test environment using AWS SAM, uploads a test file to S3, and verifies end-to-end functionality including DynamoDB writes",
                    "Implement AWS Config rules to check Lambda IAM policies and trigger SNS notifications when permissions are insufficient",
                    "Use IAM Access Analyzer to review Lambda permissions before deployment and require manual approval if issues are detected"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Integration testing with actual deployment (B) validates the complete configuration including IAM permissions. Unit tests with mocks (A) won't catch permission issues, Config rules (C) detect but don't prevent deployment, and IAM Access Analyzer (D) adds manual steps."
            },
            {
                id: 10,
                scenario: "A development team implements CI for 8 microservices on Amazon ECS, each with its own CodePipeline. Services communicate via REST APIs. When one service is updated, dependent services sometimes break due to API contract changes. A recent authentication service update changed the response format, breaking three downstream services. The team wants to prevent breaking changes while maintaining independent deployment pipelines.",
                question: "What strategy would MOST effectively address this challenge?",
                options: [
                    "Implement API versioning for all services and maintain backward compatibility for at least two versions",
                    "Create a centralized integration testing pipeline that deploys all services together before any individual service can deploy to production",
                    "Use CodeGuru Reviewer to analyze API changes and automatically notify owners of dependent services when breaking changes are detected",
                    "Implement contract testing using tools like Pact, where each service pipeline validates that API contracts are maintained before deployment"
                ],
                correct: ["D"],
                multipleAnswers: false,
                explanation: "Contract testing (D) validates API contracts in each service's pipeline independently, catching breaking changes while maintaining pipeline independence. API versioning (A) helps but doesn't prevent breaks, centralized testing (B) defeats independent deployments, and CodeGuru (C) doesn't validate contracts."
            }
        ]
    },
    week2: {
        title: "Week 2: DevOps 2 - Part 2",
        subtitle: "CI/CD Pipeline Integration, Deployment Strategies, and DevOps Environments",
        questions: [
            {
                id: 11,
                scenario: "Your company runs a customer-facing web application on EC2 instances behind an ALB serving 50,000 active users daily. Any downtime directly impacts revenue. The team wants automated deployments using CodeDeploy but the operations team is concerned about faulty code causing outages. The current manual process takes 2 hours and requires 15 minutes of downtime. Management wants zero-downtime deployments with quick rollback capability.",
                question: "Which deployment strategy would BEST meet these requirements?",
                options: [
                    "Implement an in-place deployment using CodeDeploy, deploying to all instances simultaneously to minimize deployment duration",
                    "Configure a blue/green deployment with CodeDeploy, deploying to a new set of instances, testing thoroughly, then switching traffic via the load balancer with ability to quickly switch back",
                    "Use a rolling deployment strategy that updates 25% of instances at a time with health checks between batches",
                    "Implement a canary deployment routing 5% of traffic to the new version for 1 hour, then gradually increase traffic"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Blue/green deployment (B) provides zero-downtime and instant rollback by maintaining both environments and switching traffic at the load balancer. In-place (A) risks all instances, rolling (C) provides gradual rollout but slower rollback, and canary (D) is good but blue/green offers faster complete rollback."
            },
            {
                id: 12,
                scenario: "A financial services company has a critical trading application using CodePipeline for continuous delivery. During peak trading hours (9 AM - 4 PM EST), the application handles thousands of transactions per second. Any deployment during this time risks transaction failures. The development team needs to deploy bug fixes multiple times per day but the current pipeline deploys immediately after tests pass, causing issues during trading hours.",
                question: "How should the pipeline be modified to safely enable frequent deployments?",
                options: [
                    "Configure the pipeline to automatically pause before deployment and require manual approval from operations team during trading hours",
                    "Implement EventBridge scheduled rules to automatically approve deployments only during off-peak hours with emergency override capability",
                    "Use CodeDeploy with canary deployment routing only 1% of traffic to new versions during trading hours, increasing to 100% after hours",
                    "Modify the pipeline to queue deployments during trading hours and automatically execute them after 4 PM using AWS Step Functions"
                ],
                correct: ["D"],
                multipleAnswers: false,
                explanation: "Queuing deployments with Step Functions (D) allows the team to continue their workflow while safely deferring deployment to off-peak hours with automation. Manual approval (A) creates bottlenecks, EventBridge rules (B) lack flexibility, and canary during peak (C) still risks production during critical hours."
            },
            {
                id: 13,
                scenario: "Your organization is migrating from manual deployments to automated CI/CD using CodePipeline and CodeDeploy. The application runs on 20 EC2 instances behind an ALB. During a test deployment using in-place strategy, the deployment failed halfway, leaving 10 instances with the new version and 10 with the old version. This caused inconsistent behavior and data corruption. The team needs a strategy ensuring all instances run the same version and handles failures without leaving the application in an inconsistent state.",
                question: "Which deployment configuration would BEST address these requirements?",
                options: [
                    "Configure CodeDeploy with in-place deployment using AllAtOnce configuration to ensure all instances are updated simultaneously",
                    "Implement a blue/green deployment strategy where a completely new set of instances is created, validated, and traffic is switched atomically via the load balancer",
                    "Use a rolling deployment with OneAtATime configuration and enable automatic rollback on deployment failure",
                    "Configure an immutable deployment strategy using Elastic Beanstalk that creates new instances, validates them, then terminates old instances"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Blue/green deployment (B) ensures atomic cutover - all traffic switches at once, preventing mixed versions. If deployment fails, old environment remains untouched. AllAtOnce (A) risks all instances simultaneously, rolling (C) can still have mixed versions during deployment, and Elastic Beanstalk (D) requires migration from current setup."
            },
            {
                id: 14,
                scenario: "A retail company uses AWS Proton to standardize infrastructure deployments across 20 development teams. Each team deploys microservices with different requirements: some need RDS databases, others use DynamoDB, and some require SQS queues. The platform team wants to provide self-service deployment capabilities while enforcing security and compliance standards. Teams frequently request new environment configurations that take weeks to provision manually.",
                question: "How should the platform team structure AWS Proton to meet these requirements?",
                options: [
                    "Create a single Proton environment template that includes all possible resources (RDS, DynamoDB, SQS) and let teams choose which to enable via parameters",
                    "Create separate Proton environment templates for each resource combination and separate service templates for each microservice type, allowing teams to self-service deploy approved configurations",
                    "Use AWS Service Catalog to create a portfolio of CloudFormation templates and allow teams to provision resources directly without Proton",
                    "Create one Proton environment template per team with hardcoded configurations specific to each team's requirements"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Separate environment and service templates (B) provide flexibility while maintaining standards. Teams can self-service deploy approved configurations. A single template (A) becomes complex and hard to maintain, Service Catalog (C) bypasses Proton's standardization benefits, and per-team templates (D) defeat the purpose of standardization."
            },
            {
                id: 15,
                scenario: "Your company is implementing a deployment strategy for a new feature in a high-traffic e-commerce application. The feature involves significant changes to the checkout flow. The product team wants to validate the feature with a small percentage of users before full rollout, measure conversion rates, and be able to instantly disable the feature if issues arise. The application runs on EC2 instances behind an Application Load Balancer.",
                question: "Which combination of AWS services would BEST support this requirement?",
                options: [
                    "Use CodeDeploy blue/green deployment to deploy to a separate environment and use Route 53 weighted routing to send 5% of traffic to the new version",
                    "Configure an ALB with weighted target groups to route a percentage of traffic to new instances, use CloudWatch to monitor conversion metrics, and CodeDeploy for rollback",
                    "Implement AWS Lambda@Edge to intercept requests and route a percentage to the new feature based on user attributes stored in cookies",
                    "Use Amazon CloudFront with multiple origins to distribute traffic between old and new versions based on geographic location"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "ALB weighted target groups (B) provide precise traffic splitting, CloudWatch monitors business metrics, and CodeDeploy enables quick rollback. Route 53 weighted routing (A) works at DNS level with slower propagation, Lambda@Edge (C) adds complexity, and CloudFront geographic routing (D) doesn't achieve percentage-based splitting."
            },
            {
                id: 16,
                scenario: "A development team uses AWS Service Catalog to provide standardized infrastructure to 10 application teams. Recently, a security audit found that several teams provisioned EC2 instances without encryption enabled and S3 buckets without versioning. The platform team needs to ensure all future provisioned resources meet security standards without requiring teams to understand all security configurations. Teams should still be able to self-service provision resources.",
                question: "What is the BEST approach to enforce security standards in Service Catalog?",
                options: [
                    "Create detailed documentation explaining security requirements and train all teams on proper configuration before allowing Service Catalog access",
                    "Update Service Catalog CloudFormation templates to hardcode security configurations (encryption, versioning) and use AWS Config rules to detect and remediate non-compliant resources",
                    "Implement IAM permission boundaries that prevent teams from creating resources without encryption, requiring them to use Service Catalog templates",
                    "Use AWS Security Hub to monitor all provisioned resources and automatically terminate non-compliant resources created outside of Service Catalog"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Hardcoding security in templates (B) ensures compliance by default while Config rules catch any drift. Documentation (A) relies on human compliance, permission boundaries (C) are complex to maintain, and terminating resources (D) is disruptive and doesn't prevent the issue."
            },
            {
                id: 17,
                scenario: "Your organization runs a microservices application where each service is deployed independently using CodeDeploy. A recent deployment of the payment service caused a cascading failure because the new version had a memory leak that only manifested under production load. The issue wasn't caught in staging because staging doesn't receive the same traffic volume. The team needs a deployment strategy that validates new versions under real production load before full rollout.",
                question: "Which deployment approach would BEST address this requirement?",
                options: [
                    "Implement load testing in the staging environment using tools like Apache JMeter to simulate production traffic volumes before deployment",
                    "Use CodeDeploy with a canary deployment configuration that routes a small percentage of production traffic to the new version, monitors CloudWatch metrics for memory and error rates, then proceeds or rolls back automatically",
                    "Deploy the new version to production during off-peak hours when traffic is low, monitor for issues, and roll back if problems are detected",
                    "Implement blue/green deployment and use Route 53 weighted routing to gradually shift traffic from the old to new environment over several hours"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Canary deployment with automatic monitoring (B) validates under real production load with minimal blast radius. Load testing in staging (A) can't fully replicate production, off-peak deployment (C) still exposes all users eventually, and gradual Route 53 shifting (D) is slower to respond to issues than automated canary rollback."
            },
            {
                id: 18,
                scenario: "A company is standardizing DevOps practices across 5 development teams using AWS CodePipeline. Each team has different deployment targets: Team A deploys to ECS, Team B to Lambda, Team C to EC2, Team D to Elastic Beanstalk, and Team E to EKS. The DevOps team wants to create reusable pipeline templates that enforce consistent stages (source, build, test, security scan, deploy) while allowing teams to customize their deployment stage.",
                question: "What is the MOST maintainable approach to implement this standardization?",
                options: [
                    "Create five separate CodePipeline configurations, one per team, with identical source/build/test stages and different deployment stages",
                    "Use AWS CloudFormation with nested stacks to create a standard pipeline template where the deployment stage is parameterized, allowing teams to specify their deployment target",
                    "Implement AWS Proton with a service template that defines the standard pipeline stages and allows teams to select their deployment target type",
                    "Create a single CodePipeline that deploys to all five targets simultaneously and let each team monitor only their relevant deployment stage"
                ],
                correct: ["C"],
                multipleAnswers: false,
                explanation: "AWS Proton (C) is purpose-built for this use case, providing standardized templates with customizable deployment targets. Separate pipelines (A) create maintenance overhead, CloudFormation nested stacks (B) work but require more manual management than Proton, and a single pipeline (D) creates unnecessary coupling between teams."
            },
            {
                id: 19,
                scenario: "Your company's CodePipeline deployment to production failed after passing all tests in staging. Investigation revealed the failure was caused by a difference in environment variables between staging and production. The staging environment had a database connection string pointing to a test database, while production needed a different connection string. This type of configuration drift between environments has caused three production failures in the past month.",
                question: "What is the BEST approach to prevent environment configuration drift?",
                options: [
                    "Create a checklist that developers must complete before each deployment, verifying all environment variables are correctly set in production",
                    "Store all environment-specific configuration in AWS Systems Manager Parameter Store with separate parameter paths per environment, and have the application retrieve configuration at runtime",
                    "Hardcode all configuration values in the application code and use feature flags to switch between staging and production settings",
                    "Use separate CodePipeline instances for staging and production with manually maintained environment variable configurations"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Parameter Store (B) provides centralized, environment-specific configuration management that applications retrieve at runtime, eliminating drift. Checklists (A) rely on human compliance, hardcoding (C) is a security risk and inflexible, and separate pipelines with manual configs (D) perpetuates the drift problem."
            },
            {
                id: 20,
                scenario: "A startup is building their first CI/CD pipeline on AWS for a Node.js web application deployed on Elastic Beanstalk. They have a small team of 3 developers and limited AWS experience. They need a pipeline that automatically deploys to a staging environment on every commit to the main branch, runs basic tests, and requires one-click promotion to production. The solution should be simple to maintain and cost-effective.",
                question: "Which pipeline architecture would BEST meet these requirements?",
                options: [
                    "Use CodePipeline with CodeCommit as source, CodeBuild for testing, and separate CodeDeploy stages for staging and production with a manual approval gate between them",
                    "Configure CodePipeline with GitHub as source, CodeBuild for testing, Elastic Beanstalk deployment to staging, a manual approval action, then Elastic Beanstalk deployment to production",
                    "Implement a custom deployment script using AWS Lambda triggered by GitHub webhooks that runs tests and deploys to Elastic Beanstalk",
                    "Use AWS Amplify to host the application with built-in CI/CD that automatically deploys branches to separate environments"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CodePipeline with GitHub, CodeBuild, and Elastic Beanstalk (B) provides a simple, managed pipeline with the exact workflow needed. CodeCommit (A) adds migration overhead, custom Lambda scripts (C) require significant development and maintenance, and Amplify (D) is better suited for frontend applications."
            }
        ]
    },
    week3: {
        title: "Week 3: DevOps 2 - Part 3",
        subtitle: "DevSecOps and Security Integration",
        questions: [
            {
                id: 21,
                scenario: "A healthcare application team is implementing DevSecOps for their HIPAA-compliant patient portal. Security scans are performed manually after development, taking 3-5 days and creating a bottleneck. The team deploys weekly and management wants to shift security left while maintaining compliance. The application uses CodePipeline with source, build, test, and deploy stages.",
                question: "Which approach would BEST integrate security scanning into the CI/CD pipeline while maintaining compliance?",
                options: [
                    "Add CodeGuru Security scanning in the build stage and Amazon Inspector scanning in a pre-deployment stage, with automatic pipeline failure on critical findings",
                    "Implement AWS Security Hub to aggregate findings from multiple security tools, then require manual security team approval before each production deployment",
                    "Configure CodeBuild to run OWASP ZAP penetration testing after deployment to staging, generating reports for security team review before production",
                    "Use Lambda functions to trigger third-party SAST tools on code commit, storing results in S3, and sending SNS notifications to security team for review"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Option A provides automated security scanning at multiple stages with automatic blocking of critical issues, shifting security left while maintaining standards. B still requires manual approval creating delays, C only scans after deployment, and D requires manual review defeating automation goals."
            },
            {
                id: 22,
                scenario: "Your company is developing a microservices e-commerce platform. Security audits revealed several services have vulnerabilities in dependencies including outdated libraries with known CVEs. The team uses Python, Node.js, and Java across different services. Management wants automated vulnerability scanning for all dependencies without disrupting development workflow. The team uses CodeCommit and CodePipeline.",
                question: "What is the MOST comprehensive approach to address dependency vulnerabilities?",
                options: [
                    "Implement Amazon Inspector to scan EC2 instances and Lambda functions for vulnerabilities with automatic notifications",
                    "Configure CodeBuild to run language-specific dependency scanning tools (pip-audit for Python, npm audit for Node.js, OWASP Dependency-Check for Java) in the build stage, failing builds on high-severity vulnerabilities",
                    "Use CodeGuru Security to scan source code for security issues and integrate findings into pull requests for developer review",
                    "Deploy AWS Security Hub with automated remediation workflows using Systems Manager to patch vulnerable dependencies automatically"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Language-specific dependency scanning in CodeBuild (B) provides comprehensive coverage across all languages in the build stage. Inspector (A) scans runtime environments not dependencies, CodeGuru Security (C) focuses on code not dependencies, and Security Hub (D) aggregates findings but doesn't scan dependencies."
            },
            {
                id: 23,
                scenario: "A fintech startup is building a payment processing API that must comply with PCI DSS. The security team found that secrets (API keys, database passwords, encryption keys) are hardcoded in configuration files stored in CodeCommit. The development team needs a solution that securely manages secrets, integrates with their CI/CD pipeline, and allows secret rotation without code changes or redeployment.",
                question: "Which solution would BEST address the secret management requirements?",
                options: [
                    "Store secrets in Systems Manager Parameter Store with SecureString type and configure IAM roles for EC2 instances to access parameters",
                    "Use AWS Secrets Manager to store all secrets with automatic rotation enabled, configure applications to retrieve secrets at runtime using AWS SDK, and use IAM roles to control access",
                    "Encrypt secrets using AWS KMS and store encrypted values in CodeCommit, then decrypt them during the build process in CodeBuild",
                    "Store secrets in Amazon S3 with server-side encryption, configure bucket policies to restrict access, and download secrets during application startup"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "AWS Secrets Manager (B) provides automatic rotation, versioning, and fine-grained access control, meeting all requirements including rotation without redeployment. Parameter Store (A) lacks automatic rotation, storing encrypted in CodeCommit (C) still exposes secrets in version control, and S3 (D) doesn't provide rotation capabilities."
            },
            {
                id: 24,
                scenario: "Your organization's DevSecOps team wants to implement automated security testing for infrastructure as code templates. Development teams use CloudFormation to provision AWS resources, but recent deployments created S3 buckets with public access, security groups with 0.0.0.0/0 ingress on port 22, and RDS instances without encryption. These misconfigurations were only discovered during quarterly security audits. The team wants to catch these issues before templates are deployed.",
                question: "What is the MOST effective approach to prevent IaC security misconfigurations?",
                options: [
                    "Implement AWS Config rules to detect non-compliant resources after deployment and automatically remediate using Systems Manager Automation",
                    "Add a CodeBuild stage in the pipeline that runs cfn-nag or Checkov to scan CloudFormation templates for security issues before deployment, failing the pipeline on critical findings",
                    "Use AWS CloudFormation Guard to define policy rules and validate templates manually before committing to CodeCommit",
                    "Enable AWS Security Hub with AWS Foundational Security Best Practices standard to detect misconfigurations after deployment"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Automated IaC scanning in CodeBuild (B) catches misconfigurations before deployment, truly shifting security left. Config rules (A) and Security Hub (D) only detect issues after deployment, and manual CloudFormation Guard (C) relies on developers remembering to run it."
            },
            {
                id: 25,
                scenario: "A company runs a containerized application on Amazon ECS. The security team wants to ensure container images don't contain known vulnerabilities before being deployed to production. Currently, developers build images in CodeBuild and push directly to ECR without any vulnerability scanning. A recent incident involved a container with a critical CVE that was exploited in production. The team needs automated scanning integrated into the CI/CD pipeline.",
                question: "Which approach would BEST implement container image security scanning?",
                options: [
                    "Enable ECR image scanning on push, configure CodePipeline to check scan results after the push stage, and fail the pipeline if critical vulnerabilities are found",
                    "Use Amazon Inspector to scan running ECS tasks for vulnerabilities and automatically stop tasks with critical CVEs",
                    "Implement a manual review process where the security team reviews ECR scan results before approving deployments",
                    "Configure CodeBuild to run Trivy or Clair container scanning tools and fail the build if vulnerabilities exceed a defined threshold"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "ECR scanning on push with pipeline gate (A) provides automated scanning integrated into the workflow, blocking vulnerable images before deployment. Inspector (B) only scans running containers after deployment, manual review (C) creates bottlenecks, and third-party tools (D) work but ECR native scanning is simpler to maintain."
            },
            {
                id: 26,
                scenario: "Your company's application uses multiple AWS services including Lambda, API Gateway, RDS, and S3. The security team wants to implement continuous compliance monitoring to ensure all resources meet CIS AWS Foundations Benchmark standards. Currently, compliance checks are performed quarterly by an external auditor, and issues found take weeks to remediate. Management wants near-real-time compliance visibility and automated remediation for common issues.",
                question: "What combination of AWS services would BEST achieve continuous compliance monitoring?",
                options: [
                    "Use AWS Config with managed rules mapped to CIS benchmarks, AWS Security Hub to aggregate and prioritize findings, and Systems Manager Automation for automated remediation of common issues",
                    "Implement Amazon GuardDuty to detect threats and automatically remediate issues using Lambda functions triggered by GuardDuty findings",
                    "Schedule weekly Lambda functions to run compliance checks against all resources and generate reports stored in S3 for security team review",
                    "Use AWS Trusted Advisor to monitor compliance and configure SNS notifications when checks fail"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Config rules with Security Hub and Systems Manager (A) provides comprehensive continuous compliance monitoring with automated remediation. GuardDuty (B) focuses on threat detection not compliance, scheduled Lambda (C) isn't real-time, and Trusted Advisor (D) has limited compliance coverage."
            },
            {
                id: 27,
                scenario: "A development team is implementing DevSecOps practices and wants to add Amazon Inspector to their pipeline for vulnerability management. The application consists of EC2 instances running a web server and Lambda functions for background processing. The team wants Inspector to automatically scan new deployments and integrate findings into their existing Jira ticketing system for tracking remediation. Critical findings should block future deployments until resolved.",
                question: "How should the team integrate Amazon Inspector into their DevSecOps workflow?",
                options: [
                    "Enable Amazon Inspector for EC2 and Lambda, configure EventBridge rules to capture Inspector findings, use Lambda to create Jira tickets for findings, and add a pipeline stage that queries Inspector API to check for unresolved critical findings before deployment",
                    "Configure Inspector to run weekly scans and email reports to the security team, who manually create Jira tickets and approve deployments",
                    "Use Inspector only for Lambda functions since EC2 scanning requires agents and adds operational overhead",
                    "Implement Inspector scanning in a separate security pipeline that runs independently from the deployment pipeline"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Option A provides full automation: Inspector scans automatically, EventBridge captures findings, Lambda creates Jira tickets, and the pipeline gate prevents deployment with unresolved critical issues. B is manual and slow, C ignores EC2 vulnerabilities, and D separates security from deployment defeating the DevSecOps goal."
            },
            {
                id: 28,
                scenario: "Your organization is adopting a zero-trust security model for their AWS environment. The security team wants to ensure that all inter-service communications are authenticated and authorized, secrets are never stored in environment variables, and all API calls are logged and auditable. The application uses ECS tasks that communicate with RDS, S3, and third-party APIs. Currently, database credentials are stored as ECS task environment variables.",
                question: "Which combination of changes would BEST implement zero-trust principles for this application?",
                options: [
                    "Use IAM roles for ECS tasks to access AWS services, store database credentials in Secrets Manager with automatic rotation, retrieve secrets at runtime, and enable CloudTrail for API call logging",
                    "Implement VPC security groups to restrict all inter-service communication and store credentials in encrypted S3 objects that tasks download at startup",
                    "Use AWS WAF to authenticate all inter-service API calls and store credentials in Systems Manager Parameter Store",
                    "Implement mutual TLS for all service communications and store credentials in encrypted ECS task definition environment variables"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "IAM roles, Secrets Manager, and CloudTrail (A) implement zero-trust: no stored credentials, least-privilege access, runtime secret retrieval, and full auditability. Security groups (B) are network controls not zero-trust, WAF (C) is for web traffic not inter-service auth, and encrypted environment variables (D) still store credentials in task definitions."
            },
            {
                id: 29,
                scenario: "A company recently experienced a security incident where an attacker gained access to an EC2 instance and used it to exfiltrate data from S3 buckets. Post-incident analysis revealed the instance had an overly permissive IAM role with S3 full access, and there was no monitoring to detect unusual data access patterns. The security team wants to implement controls to prevent and detect similar incidents in the future.",
                question: "Which combination of controls would BEST prevent and detect this type of attack? (Select TWO)",
                options: [
                    "Implement IAM Access Analyzer to identify overly permissive policies and enforce least-privilege access for all EC2 instance roles",
                    "Enable Amazon GuardDuty to detect unusual API activity and data access patterns, with automated response using EventBridge and Lambda to isolate compromised instances",
                    "Configure VPC Flow Logs to capture all network traffic and manually review logs weekly for suspicious patterns",
                    "Implement AWS Shield Advanced to protect against DDoS attacks that could be used as a distraction during data exfiltration",
                    "Use AWS Macie to classify sensitive data in S3 and enable S3 server-side encryption for all buckets"
                ],
                correct: ["A", "B"],
                multipleAnswers: true,
                explanation: "IAM Access Analyzer (A) prevents overly permissive policies, and GuardDuty (B) detects unusual activity with automated response. VPC Flow Logs (C) require manual review and don't detect application-level access, Shield (D) protects against DDoS not data exfiltration, and Macie (E) classifies data but doesn't prevent unauthorized access."
            },
            {
                id: 30,
                scenario: "Your company is implementing a DevSecOps pipeline for a microservices application. The security team has defined the following requirements: static code analysis must run on every commit, dependency vulnerability scanning must occur during build, container images must be scanned before push to ECR, and infrastructure templates must be validated for security misconfigurations. The team wants all these checks automated in CodePipeline without manual intervention.",
                question: "What is the correct order and placement of security checks in the pipeline?",
                options: [
                    "Source stage: SAST scan → Build stage: dependency scan + container scan → Deploy stage: IaC scan",
                    "Source stage: SAST scan → Build stage: dependency scan → Post-build: container scan + IaC scan → Deploy stage: runtime scan",
                    "Build stage: SAST + dependency scan + IaC scan → Post-build: container scan → Deploy stage: Inspector scan",
                    "Source stage: IaC scan → Build stage: SAST + dependency scan → Post-build: container scan → Deploy stage: runtime verification"
                ],
                correct: ["D"],
                multipleAnswers: false,
                explanation: "Option D follows the correct order: IaC templates are scanned at source (before build), SAST and dependency scanning during build, container scanning after build (post-build), and runtime verification after deployment. This ensures each artifact is scanned at the earliest possible stage."
            }
        ]
    },
    week4: {
        title: "Week 4: Infrastructure as Code - Part 1",
        subtitle: "IaC Fundamentals, CloudFormation, and DevOps Integration",
        questions: [
            {
                id: 31,
                scenario: "Your organization is standardizing on CloudFormation. A team created a template deploying a web application with an ALB, Auto Scaling group, and RDS database. The template works in dev but fails in production because the production VPC has different subnet IDs and security group configurations. The team wants to use the same template across dev, staging, and production without maintaining multiple copies.",
                question: "What is the BEST approach to make the template reusable across environments?",
                options: [
                    "Create separate CloudFormation templates for each environment with hardcoded values specific to that environment",
                    "Use CloudFormation parameters for environment-specific values (VPC ID, subnet IDs, security groups) and pass different parameter files for each environment deployment",
                    "Use Systems Manager Parameter Store to store environment-specific values and reference them in the template using dynamic references",
                    "Implement CloudFormation conditions to check the AWS account ID and use different resource configurations based on the account"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudFormation parameters (B) provide the cleanest approach for environment-specific values, allowing one template with different parameter files per environment. Separate templates (A) create maintenance overhead, Parameter Store (C) adds complexity, and account-based conditions (D) are inflexible."
            },
            {
                id: 32,
                scenario: "A DevOps team uses CloudFormation to manage infrastructure for a microservices application. The template has grown to over 2000 lines including networking, compute, databases, and monitoring resources. Different teams need to update different sections independently. The networking team wants to modify VPC configuration without affecting database resources managed by the database team.",
                question: "How should the team restructure their CloudFormation implementation?",
                options: [
                    "Split the monolithic template into multiple nested stacks organized by resource type (networking, compute, database), with a parent stack that orchestrates them",
                    "Use CloudFormation modules to create reusable components for common patterns, then reference these modules in the main template",
                    "Implement CloudFormation StackSets to deploy the same template across multiple accounts and regions",
                    "Convert the CloudFormation template to AWS CDK code which provides better organization through programming language constructs"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Nested stacks (A) allow logical separation by resource type with independent updates while maintaining relationships through outputs/parameters. Modules (B) are for reusable patterns not organization, StackSets (C) are for multi-account deployment, and CDK (D) requires migration."
            },
            {
                id: 33,
                scenario: "Your team is creating a CloudFormation template for a web application that needs different instance types and sizes based on the environment. In dev, you need t3.micro instances with no Multi-AZ RDS. In production, you need m5.large instances with Multi-AZ RDS. The template should handle both configurations without duplication and be easy to maintain.",
                question: "What CloudFormation feature would BEST handle this requirement?",
                options: [
                    "Use CloudFormation parameters with AllowedValues to restrict instance type selection and add separate resources for dev and production configurations",
                    "Implement CloudFormation mappings to define environment-specific values and conditions to control which resources are created based on the environment parameter",
                    "Create two separate templates and use a CodePipeline stage to select the appropriate template based on the target environment",
                    "Use CloudFormation transforms to dynamically generate the appropriate resource configurations based on environment input"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Mappings and conditions (B) allow a single template to handle multiple environment configurations cleanly. Parameters alone (A) don't handle conditional resource creation, separate templates (C) create maintenance overhead, and transforms (D) are for macro processing not environment configuration."
            },
            {
                id: 34,
                scenario: "A company is deploying a three-tier web application using CloudFormation. The application tier needs to reference the VPC ID and subnet IDs created in the networking stack, and the database tier needs to reference the security group created in the application tier stack. The stacks are deployed in sequence and managed by different teams. Changes to one stack should automatically be reflected in dependent stacks.",
                question: "What is the BEST approach to share values between CloudFormation stacks?",
                options: [
                    "Hardcode the resource IDs from the networking stack into the application and database stack templates",
                    "Use CloudFormation Outputs with Export in the networking stack and ImportValue in the application and database stacks to create cross-stack references",
                    "Store all shared values in Systems Manager Parameter Store and have each stack retrieve the values using dynamic references",
                    "Use nested stacks so all resources are in a single parent stack, eliminating the need for cross-stack references"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudFormation Outputs with Export/ImportValue (B) creates explicit cross-stack dependencies that CloudFormation manages, preventing deletion of exported values while they're in use. Hardcoding (A) breaks when resources change, Parameter Store (C) works but loses CloudFormation dependency tracking, and nested stacks (D) reduce team independence."
            },
            {
                id: 35,
                scenario: "Your organization uses Terraform for infrastructure management but is migrating to AWS CloudFormation. During the migration, you need to import existing AWS resources (EC2 instances, RDS databases, S3 buckets) that were created manually or by Terraform into CloudFormation management without recreating them. The resources are in production and cannot be deleted or have downtime.",
                question: "What is the correct approach to bring existing resources under CloudFormation management?",
                options: [
                    "Create new CloudFormation templates that describe the existing resources and use CloudFormation resource import to bring them under stack management without recreation",
                    "Delete the existing resources and recreate them using CloudFormation templates to ensure they are properly managed",
                    "Use AWS Config to automatically generate CloudFormation templates from existing resources and deploy them as new stacks",
                    "Keep existing resources unmanaged and only use CloudFormation for new resources going forward"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CloudFormation resource import (A) allows existing resources to be brought under stack management without recreation or downtime. Deleting and recreating (B) causes downtime, Config template generation (C) doesn't directly import resources into stacks, and keeping resources unmanaged (D) defeats the migration goal."
            },
            {
                id: 36,
                scenario: "A development team is writing CloudFormation templates for a serverless application. The template includes Lambda functions, API Gateway, DynamoDB tables, and IAM roles. During code review, the team lead notices that the template has hardcoded ARNs, no input validation, and resources that could be created in any order causing race conditions. The template works in testing but has caused intermittent failures in production deployments.",
                question: "Which CloudFormation features should be used to address these issues?",
                options: [
                    "Use Ref and GetAtt intrinsic functions to reference resources dynamically, add parameter constraints for input validation, and use DependsOn attribute to control resource creation order",
                    "Replace all hardcoded ARNs with CloudFormation parameters and add manual deployment steps to ensure resources are created in the correct order",
                    "Split the template into multiple smaller templates deployed in sequence to control creation order and eliminate hardcoded values",
                    "Use CloudFormation macros to dynamically generate ARNs at deployment time and add Lambda-backed custom resources to handle ordering"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Ref/GetAtt for dynamic references, parameter constraints for validation, and DependsOn for ordering (A) are the correct CloudFormation-native solutions. Manual steps (B) reintroduce human error, multiple templates (C) add complexity, and macros/custom resources (D) are overkill for these standard requirements."
            },
            {
                id: 37,
                scenario: "Your company wants to implement Infrastructure as Code for their entire AWS environment including VPCs, EC2 instances, RDS databases, and IAM roles. The team has developers familiar with Python and TypeScript but limited CloudFormation YAML experience. They want to use programming language constructs like loops, conditionals, and functions to generate infrastructure, and want to reuse infrastructure patterns across multiple projects.",
                question: "Which IaC approach would BEST meet these requirements?",
                options: [
                    "Use CloudFormation with YAML templates and CloudFormation modules for reusability, providing training on YAML syntax to the team",
                    "Implement AWS CDK using TypeScript or Python, allowing developers to use familiar programming constructs and create reusable constructs for common patterns",
                    "Use Terraform with HCL syntax which provides loops and conditionals while being cloud-agnostic",
                    "Write custom Python scripts using boto3 to provision AWS resources programmatically"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "AWS CDK (B) allows developers to use familiar TypeScript or Python, provides programming constructs like loops and conditionals, and enables reusable constructs. CloudFormation YAML (A) requires learning a new syntax, Terraform (C) is valid but adds a non-AWS tool, and boto3 scripts (D) lack state management and drift detection."
            },
            {
                id: 38,
                scenario: "A company's CloudFormation deployment failed midway through creating a stack that includes an RDS database, EC2 instances, and an ALB. The stack is now in UPDATE_ROLLBACK_FAILED state because the rollback also failed when trying to delete a resource that had dependencies. The production environment is partially updated and the team needs to recover without data loss.",
                question: "What is the correct approach to recover from this CloudFormation stack failure?",
                options: [
                    "Delete the entire stack and redeploy from scratch, accepting the data loss from the RDS database",
                    "Use the ContinueUpdateRollback API to retry the rollback, optionally skipping resources that are causing the rollback to fail, then investigate and fix the root cause",
                    "Manually delete all resources created by the failed stack and then redeploy the CloudFormation template",
                    "Create a new stack with a different name that includes only the resources that failed to deploy"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "ContinueUpdateRollback (B) is the correct CloudFormation mechanism for recovering from UPDATE_ROLLBACK_FAILED state, allowing you to skip problematic resources and complete the rollback. Deleting the stack (A) causes data loss, manual deletion (C) can leave orphaned resources, and a new stack (D) creates duplicate resources."
            },
            {
                id: 39,
                scenario: "Your organization wants to enforce that all CloudFormation templates deployed in the AWS account meet specific standards: all S3 buckets must have versioning enabled, all EC2 instances must use approved AMIs, and all RDS instances must be encrypted. The platform team wants these rules enforced automatically without reviewing every template manually. Templates that don't meet standards should be rejected before deployment.",
                question: "What is the BEST approach to enforce these CloudFormation template standards?",
                options: [
                    "Create an AWS Config rule that checks resources after CloudFormation deployment and automatically deletes non-compliant resources",
                    "Use CloudFormation Hooks to invoke Lambda functions that validate templates before resource creation, rejecting deployments that don't meet standards",
                    "Implement a CodePipeline stage that runs cfn-nag to scan templates and block deployments with policy violations",
                    "Require all teams to use approved CloudFormation modules that have compliant configurations built in"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudFormation Hooks (B) intercept resource creation/update operations and can reject non-compliant configurations before resources are created. Config rules (A) detect issues after deployment, cfn-nag in pipeline (C) catches issues before deployment but not at the CloudFormation API level, and modules (D) help but don't prevent non-module deployments."
            },
            {
                id: 40,
                scenario: "A team is using CloudFormation to deploy a web application and wants to implement a deployment pipeline that automatically deploys infrastructure changes when CloudFormation templates are updated in CodeCommit. The pipeline should deploy to dev automatically, require approval for staging, and require two approvals for production. If a deployment fails in any environment, it should automatically roll back and notify the team.",
                question: "How should this pipeline be configured?",
                options: [
                    "Create a CodePipeline with CodeCommit source, CloudFormation deploy actions for each environment, manual approval actions before staging and production, and SNS notifications for failures",
                    "Use three separate CodePipelines, one per environment, each triggered by different CodeCommit branches with manual triggers between environments",
                    "Implement a Lambda function triggered by CodeCommit that directly calls CloudFormation APIs to deploy to each environment in sequence",
                    "Use AWS CodeDeploy with CloudFormation integration to manage deployments across environments with built-in approval workflows"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "A single CodePipeline with CloudFormation actions, manual approvals, and SNS notifications (A) provides the exact workflow described. Separate pipelines (B) make it harder to track promotion across environments, Lambda scripts (C) require custom approval logic, and CodeDeploy (D) is for application deployments not IaC."
            }
        ]
    },
    week5: {
        title: "Week 5: Infrastructure as Code - Part 2",
        subtitle: "Advanced CloudFormation, AWS CDK, and Testing",
        questions: [
            {
                id: 41,
                scenario: "Your team manages infrastructure across 50 CloudFormation stacks. Several stacks have experienced drift - manual changes made through the AWS Console that aren't reflected in templates. This has caused issues when updating stacks. The operations team needs to detect drift regularly and alert the team when drift is detected with detailed information about what changed.",
                question: "What is the MOST effective approach to manage and monitor CloudFormation drift?",
                options: [
                    "Create a Lambda function triggered by EventBridge on a schedule that runs drift detection on all stacks, publishes results to SNS, and stores detailed drift reports in S3",
                    "Enable AWS Config rules to monitor CloudFormation stacks and trigger notifications when resources are modified outside of CloudFormation",
                    "Implement CloudTrail logging and create CloudWatch alarms that trigger when API calls modify resources managed by CloudFormation",
                    "Use Systems Manager Change Calendar to block all manual changes during business hours and only allow changes through CloudFormation"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Scheduled Lambda with drift detection (A) provides comprehensive automated monitoring with detailed reports. Config rules (B) monitor resource changes but don't provide CloudFormation-specific drift analysis, CloudTrail (C) logs changes but doesn't detect drift, and Change Calendar (D) is preventive not detective."
            },
            {
                id: 42,
                scenario: "A company uses AWS CDK to define their infrastructure in TypeScript. The CDK app creates VPCs, ECS clusters, RDS databases, and IAM roles. After a recent CDK deployment, an IAM role was created with overly permissive policies due to a bug in the CDK code. The team wants to implement testing for their CDK constructs to catch such issues before deployment.",
                question: "What testing approach would BEST validate CDK constructs before deployment?",
                options: [
                    "Deploy the CDK app to a sandbox AWS account and manually verify all resources are created correctly before deploying to production",
                    "Use CDK assertions library to write unit tests that validate the synthesized CloudFormation template contains the expected resources and configurations, including IAM policy validation",
                    "Run cdk diff before every deployment and have a team member review the changes before approving",
                    "Implement CloudFormation Hooks that validate IAM policies when the CDK-generated template is deployed"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CDK assertions unit tests (B) validate the synthesized CloudFormation template programmatically, catching issues before any deployment. Sandbox deployment (A) is slow and manual, cdk diff review (C) relies on human review, and CloudFormation Hooks (D) only catch issues at deployment time."
            },
            {
                id: 43,
                scenario: "Your organization is deploying a multi-region application using CloudFormation StackSets. The application needs to be deployed to 15 AWS regions with region-specific configurations (different AMI IDs per region, region-specific S3 bucket names). The platform team manages the StackSet from a central management account. A recent update to the StackSet caused failures in 3 regions due to service availability differences.",
                question: "How should the StackSet be configured to handle region-specific configurations and deployment failures?",
                options: [
                    "Create separate CloudFormation templates for each region with hardcoded region-specific values and deploy them individually",
                    "Use CloudFormation mappings in the StackSet template to define region-specific values, configure failure tolerance to allow deployment to continue if some regions fail, and use deployment batches to control rollout speed",
                    "Deploy the StackSet to all regions simultaneously with no failure tolerance to ensure consistency across all regions",
                    "Use AWS Systems Manager Parameter Store with region-specific parameters and configure the StackSet to retrieve values from the local region's Parameter Store"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Mappings for region-specific values with failure tolerance and batched deployment (B) handles regional differences and failures gracefully. Separate templates (A) defeat the purpose of StackSets, simultaneous deployment with no tolerance (C) causes complete failure if any region fails, and Parameter Store (D) requires parameters to exist in every region."
            },
            {
                id: 44,
                scenario: "A development team is building a CDK application that creates Lambda functions, API Gateway, and DynamoDB tables. They want to implement a construct that can be reused across multiple CDK applications in their organization. The construct should enforce organizational standards like encryption, tagging, and logging. Other teams should be able to install and use this construct without understanding the underlying implementation details.",
                question: "What is the BEST approach to create and distribute this reusable CDK construct?",
                options: [
                    "Copy the construct code into each CDK application that needs it and maintain separate copies for each team",
                    "Create a CDK construct library as a separate npm package, publish it to a private npm registry or AWS CodeArtifact, and have teams install it as a dependency",
                    "Create a CloudFormation module that implements the same functionality and have teams reference it in their CloudFormation templates",
                    "Store the construct code in a shared S3 bucket and have teams download and include it in their CDK applications"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "A CDK construct library published to a private registry (B) provides proper versioning, dependency management, and distribution. Copying code (A) creates maintenance nightmares, CloudFormation modules (C) don't work with CDK, and S3 storage (D) lacks versioning and dependency management."
            },
            {
                id: 45,
                scenario: "Your team uses CloudFormation to manage a complex application stack with 150 resources. During a recent update, CloudFormation detected that 12 resources had drifted from their template definitions. Some drift was intentional (approved manual changes not yet reflected in templates), while other drift was unauthorized. The team needs to reconcile the stack state without losing the intentional changes or disrupting the running application.",
                question: "What is the correct approach to handle this mixed drift scenario?",
                options: [
                    "Run a stack update to force all resources back to the template-defined state, accepting that intentional changes will be reverted",
                    "Update the CloudFormation template to reflect the intentional manual changes, then run a stack update to remediate only the unauthorized drift",
                    "Delete and recreate the entire stack from scratch with the correct template to ensure a clean state",
                    "Use CloudFormation resource import to re-import all drifted resources with their current configurations"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Updating the template to reflect intentional changes then running a stack update (B) preserves approved changes while remediating unauthorized drift. Forcing all resources back (A) loses intentional changes, recreating the stack (C) causes downtime, and re-importing (D) is for bringing unmanaged resources into stacks."
            },
            {
                id: 46,
                scenario: "A company is migrating from manually managed EC2 instances to CDK-managed infrastructure. They have 50 EC2 instances with various configurations that need to be represented as CDK constructs. The team wants to use CDK's L2 constructs for EC2 instances but needs to ensure the CDK-synthesized CloudFormation template matches the existing instance configurations exactly before importing the instances into CloudFormation management.",
                question: "What is the correct migration approach?",
                options: [
                    "Write CDK code for all 50 instances, synthesize the CloudFormation template, compare it with the existing instance configurations, adjust CDK code until they match, then use CloudFormation resource import",
                    "Terminate all existing instances and redeploy them using CDK to ensure they are properly managed from the start",
                    "Use AWS Config to automatically generate CDK code from existing instances and deploy it as a new CDK app",
                    "Keep existing instances unmanaged and only use CDK for new instances going forward"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Writing CDK code, synthesizing, comparing, and then importing (A) ensures the CDK representation matches reality before taking management control. Terminating instances (B) causes downtime, Config doesn't generate CDK code (C), and keeping instances unmanaged (D) defeats the migration goal."
            },
            {
                id: 47,
                scenario: "Your organization's CloudFormation templates are stored in CodeCommit and deployed via CodePipeline. The templates have grown complex and the team wants to implement a testing strategy that validates templates before deployment. They want to catch syntax errors, security misconfigurations, and logical errors (like referencing non-existent parameters) without deploying to AWS.",
                question: "What combination of testing tools would provide the most comprehensive pre-deployment validation?",
                options: [
                    "Run cfn-lint to validate template syntax and best practices, cfn-nag to check for security issues, and use CloudFormation change sets in a test account to validate logical correctness",
                    "Deploy templates to a sandbox account and manually verify all resources are created correctly before promoting to production",
                    "Use the AWS CloudFormation console's template designer to visually validate templates before deployment",
                    "Run the AWS CLI cloudformation validate-template command which checks syntax, security, and logical correctness"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "cfn-lint for syntax/best practices, cfn-nag for security, and change sets for logical validation (A) provides comprehensive testing. Manual sandbox deployment (B) is slow, the designer (C) only provides visual validation, and validate-template (D) only checks basic syntax not security or logic."
            },
            {
                id: 48,
                scenario: "A team is using AWS CDK to build a data processing pipeline with S3, Lambda, SQS, and DynamoDB. They want to implement integration tests that verify the actual AWS resources work correctly together after deployment. The tests should run automatically in the CI/CD pipeline after deployment to a test environment and clean up resources after testing.",
                question: "What is the BEST approach to implement CDK integration testing?",
                options: [
                    "Use CDK integ-tests library to define integration tests that deploy the CDK app to a test environment, run assertions against real AWS resources, and automatically clean up after testing",
                    "Write boto3 scripts that manually create test resources, run tests, and delete resources after completion",
                    "Use CDK unit tests with mocked AWS SDK calls to simulate the behavior of real AWS services",
                    "Deploy to production and use CloudWatch alarms to detect if the integration is working correctly"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CDK integ-tests (A) is purpose-built for CDK integration testing, providing automated deployment, real resource testing, and cleanup. boto3 scripts (B) require manual resource management, unit tests with mocks (C) don't test real AWS behavior, and production testing (D) risks real users."
            },
            {
                id: 49,
                scenario: "Your company uses CloudFormation nested stacks to manage a complex application. The parent stack creates a VPC, and child stacks create application resources within that VPC. A recent change to the parent stack's VPC configuration caused all child stacks to fail because they referenced the old VPC ID. The team needs a way to update the parent stack and automatically propagate changes to child stacks without manual intervention.",
                question: "How should the nested stack architecture be configured to handle parent stack updates?",
                options: [
                    "Use CloudFormation Outputs and cross-stack references so child stacks automatically receive updated values when the parent stack is updated",
                    "Hardcode the VPC ID in each child stack and manually update them whenever the parent stack changes",
                    "Use nested stacks where child stacks are defined within the parent stack template, so CloudFormation automatically manages the dependency and update propagation",
                    "Store the VPC ID in Systems Manager Parameter Store and have child stacks retrieve it dynamically at deployment time"
                ],
                correct: ["C"],
                multipleAnswers: false,
                explanation: "True nested stacks (C) where child stacks are resources within the parent template allow CloudFormation to automatically manage dependencies and propagate updates. Cross-stack references (A) don't automatically trigger child stack updates, hardcoding (B) requires manual updates, and Parameter Store (D) requires redeployment of child stacks."
            },
            {
                id: 50,
                scenario: "A company wants to implement a self-service infrastructure portal where developers can provision approved infrastructure patterns (web application stack, data processing pipeline, microservice template) without needing CloudFormation expertise. Each pattern should enforce security standards, support customization through parameters, and track who provisioned what resources for cost allocation. The platform team wants to maintain control over approved patterns.",
                question: "Which AWS service combination would BEST implement this self-service portal?",
                options: [
                    "Create a CodePipeline that developers trigger with parameters to deploy CloudFormation templates from a central repository",
                    "Use AWS Service Catalog to create a portfolio of approved CloudFormation products, configure launch constraints with IAM roles, and use TagOptions for cost allocation tagging",
                    "Implement AWS Proton with environment and service templates that developers can deploy through the Proton console",
                    "Create an internal web portal using Lambda and API Gateway that calls CloudFormation APIs to deploy templates on behalf of developers"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Service Catalog (B) is purpose-built for self-service infrastructure provisioning with approved products, launch constraints for security, and TagOptions for cost allocation. CodePipeline (A) requires pipeline expertise, Proton (C) is better for DevOps platform standardization, and a custom portal (D) requires significant development effort."
            }
        ]
    },
    week6: {
        title: "Week 6: Logging and Scaling - Part 1",
        subtitle: "Auto Scaling and Elastic Load Balancing",
        questions: [
            {
                id: 51,
                scenario: "An e-commerce company runs their web application on EC2 instances in an Auto Scaling group behind an ALB. The application experiences predictable traffic: low from midnight to 6 AM (100 req/min), moderate 6 AM to 6 PM (500 req/min), and high 6 PM to midnight (2000 req/min). Currently using target tracking scaling at 70% CPU, but this results in slow scale-out during sudden traffic spikes at 6 PM, causing poor user experience for 10-15 minutes.",
                question: "How can the team optimize the Auto Scaling configuration to handle the predictable traffic pattern more effectively?",
                options: [
                    "Implement predictive scaling that uses machine learning to forecast traffic and scale proactively based on historical patterns",
                    "Change the target tracking policy to use ALB request count per target metric instead of CPU utilization for faster response",
                    "Configure scheduled scaling actions to increase capacity before the 6 PM traffic spike and decrease after midnight",
                    "Reduce the target CPU utilization to 50% so that scaling occurs earlier and provides more buffer capacity"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Predictive scaling (A) is ideal for predictable patterns, scaling proactively before traffic increases using ML. Scheduled scaling (C) works but is less flexible than ML-based prediction. Request count metric (B) is reactive not proactive, and lower CPU target (D) wastes resources during low-traffic periods."
            },
            {
                id: 52,
                scenario: "A company runs a stateful application on EC2 instances where each instance stores user session data locally. The Auto Scaling group scales out during peak hours but users experience session loss when instances are terminated during scale-in. The application currently uses sticky sessions on the ALB to route users to the same instance. During scale-in events, the ALB terminates connections abruptly causing user complaints.",
                question: "What is the BEST approach to handle session management during Auto Scaling events?",
                options: [
                    "Increase the scale-in cooldown period to 2 hours to ensure users complete their sessions before instances are terminated",
                    "Migrate session storage to Amazon ElastiCache Redis, remove sticky sessions from the ALB, and configure Auto Scaling lifecycle hooks to drain connections before terminating instances",
                    "Use ALB connection draining with a 5-minute timeout and configure the application to save session data to local disk before shutdown",
                    "Implement reserved instances to prevent scale-in events and maintain a fixed number of instances at all times"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Centralized session storage in ElastiCache (B) eliminates session loss regardless of which instance handles requests, and lifecycle hooks ensure graceful connection draining. Long cooldown (A) wastes resources, local disk storage (C) doesn't survive instance termination, and reserved instances (D) eliminate the cost benefits of Auto Scaling."
            },
            {
                id: 53,
                scenario: "Your company's web application experiences unpredictable traffic spikes due to viral social media posts. The Auto Scaling group uses target tracking scaling but instances take 8 minutes to launch and pass health checks, causing performance degradation during sudden spikes. The application is stateless and instances can be pre-warmed. You need to reduce the time to handle traffic spikes without significantly increasing costs during normal operation.",
                question: "Which combination of strategies would BEST address the slow scale-out problem?",
                options: [
                    "Use larger instance types so fewer instances are needed and each instance can handle more traffic during spikes",
                    "Implement a warm pool for the Auto Scaling group to maintain pre-initialized instances in a stopped state, and configure step scaling policies with aggressive scale-out thresholds",
                    "Increase the minimum capacity of the Auto Scaling group to handle peak traffic at all times",
                    "Use Amazon CloudFront with caching to absorb traffic spikes before they reach the Auto Scaling group"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Warm pools (B) keep pre-initialized instances ready to launch quickly, and step scaling with aggressive thresholds triggers scale-out earlier. Larger instances (A) don't solve the launch time problem, always-on peak capacity (C) is expensive, and CloudFront (D) helps with static content but not dynamic application traffic."
            },
            {
                id: 54,
                scenario: "A company runs a microservices application on Amazon ECS with multiple services. Each service has different scaling requirements: the API service needs to scale based on request count, the worker service needs to scale based on SQS queue depth, and the cache service should maintain a fixed number of tasks. The team wants to implement auto scaling for each service independently.",
                question: "How should ECS Service Auto Scaling be configured for each service?",
                options: [
                    "Use the same target tracking scaling policy for all services based on CPU utilization to maintain consistency",
                    "Configure target tracking scaling for the API service using ALB request count per target, step scaling for the worker service based on SQS queue depth CloudWatch metric, and set fixed desired count for the cache service with no scaling policy",
                    "Implement scheduled scaling for all services based on historical traffic patterns",
                    "Use AWS Application Auto Scaling with a single scaling policy that monitors all services and scales them together"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Service-specific scaling policies (B) match each service's actual scaling driver: request count for API, queue depth for workers, and fixed count for cache. Same policy for all (A) ignores different scaling needs, scheduled scaling (C) doesn't handle unpredictable load, and single policy for all (D) creates inappropriate coupling."
            },
            {
                id: 55,
                scenario: "Your organization runs a multi-tier application with a web tier, application tier, and database tier. The web tier uses an ALB with EC2 Auto Scaling, the application tier uses an internal ALB with EC2 Auto Scaling, and the database tier uses Amazon Aurora. During a recent load test, the web tier scaled correctly but the application tier became a bottleneck because it didn't scale fast enough. The database tier showed high CPU due to connection pool exhaustion from too many application tier instances.",
                question: "What changes would BEST address the scaling bottleneck and database connection issues?",
                options: [
                    "Increase the application tier's maximum capacity and add RDS Proxy between the application tier and Aurora to manage database connections efficiently",
                    "Reduce the web tier's maximum capacity to prevent it from overwhelming the application tier",
                    "Migrate the application tier to Lambda functions which scale automatically and use connection pooling built into the Lambda runtime",
                    "Implement ElastiCache in front of Aurora to cache database queries and reduce connection pressure"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Increasing application tier capacity and adding RDS Proxy (A) addresses both the scaling bottleneck and connection pool exhaustion. RDS Proxy multiplexes connections, allowing many application instances to share fewer database connections. Reducing web tier capacity (B) degrades user experience, Lambda migration (C) requires significant refactoring, and ElastiCache (D) helps with read caching but not connection management."
            },
            {
                id: 56,
                scenario: "A company is designing a highly available web application that must survive the failure of an entire AWS Availability Zone. The application uses EC2 instances behind an ALB and an RDS MySQL database. The team needs to ensure that if one AZ fails, the application continues to serve traffic with minimal disruption. The current architecture has all instances in a single AZ.",
                question: "What architecture changes are required to achieve AZ-level fault tolerance?",
                options: [
                    "Deploy EC2 instances in a single AZ but use multiple instance types to reduce the risk of simultaneous failures",
                    "Configure the Auto Scaling group to span multiple AZs with instances distributed evenly, use an ALB that routes traffic across AZs, and enable Multi-AZ for RDS with automatic failover",
                    "Use Amazon CloudFront to cache all application responses so the application can continue serving traffic even if all EC2 instances fail",
                    "Implement EC2 instance recovery alarms in CloudWatch to automatically recover failed instances within the same AZ"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Multi-AZ Auto Scaling with ALB and Multi-AZ RDS (B) provides true AZ-level fault tolerance. Single AZ with multiple instance types (A) doesn't survive AZ failure, CloudFront caching (C) only works for cacheable content, and instance recovery (D) recovers within the same AZ which would still be unavailable."
            },
            {
                id: 57,
                scenario: "Your company's application uses an Application Load Balancer to route traffic to multiple target groups based on URL paths: /api/* routes to the API service, /static/* routes to the static content service, and /* routes to the main application. During a deployment, you need to implement a canary release for the API service only, routing 10% of /api/* traffic to the new version while keeping all other routing unchanged.",
                question: "How should the ALB be configured to implement this canary release?",
                options: [
                    "Create a new ALB for the canary deployment and use Route 53 weighted routing to send 10% of all traffic to the new ALB",
                    "Modify the /api/* listener rule to use weighted target group routing, sending 90% to the existing API target group and 10% to a new target group running the canary version",
                    "Use AWS CodeDeploy with canary deployment configuration to automatically manage the traffic splitting for the API service",
                    "Implement Lambda@Edge to intercept /api/* requests and randomly route 10% to the canary version based on a random number"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "ALB weighted target groups (B) provide precise traffic splitting at the path level, affecting only /api/* traffic. Route 53 weighted routing (A) affects all traffic not just /api/*, CodeDeploy canary (C) manages instance-level deployment not ALB routing, and Lambda@Edge (D) adds unnecessary complexity."
            },
            {
                id: 58,
                scenario: "A company runs a batch processing application that processes large files uploaded to S3. The processing is CPU-intensive and takes 2-4 hours per file. Files are uploaded unpredictably throughout the day, with bursts of 50-100 files sometimes arriving within minutes. The current architecture uses a fixed fleet of 10 EC2 instances that are always running, resulting in high costs during idle periods and processing delays during bursts.",
                question: "What architecture would BEST optimize cost and performance for this workload?",
                options: [
                    "Use EC2 Spot Instances in an Auto Scaling group triggered by SQS queue depth, with S3 event notifications sending messages to SQS when files are uploaded",
                    "Increase the fixed fleet to 50 instances to handle burst processing without delays",
                    "Use AWS Lambda to process files directly from S3 events, scaling automatically with each file upload",
                    "Implement scheduled scaling to increase capacity during business hours and reduce it overnight"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Spot Instances with SQS-triggered Auto Scaling (A) provides cost-effective burst capacity that scales with actual demand. Spot Instances reduce costs by up to 90% for fault-tolerant batch workloads. Fixed fleet of 50 (B) is expensive during idle periods, Lambda (C) has a 15-minute timeout unsuitable for 2-4 hour jobs, and scheduled scaling (D) doesn't handle unpredictable bursts."
            },
            {
                id: 59,
                scenario: "Your organization uses Elastic Load Balancing to distribute traffic across EC2 instances in multiple AZs. During a recent incident, one AZ had degraded network performance causing slow responses. The ALB continued routing traffic to instances in the degraded AZ, resulting in poor user experience. The team wants to implement automatic detection and removal of unhealthy AZs from the load balancer rotation.",
                question: "What is the BEST approach to automatically handle AZ degradation?",
                options: [
                    "Configure ALB health checks with aggressive thresholds (2 failures in 10 seconds) to quickly detect and remove unhealthy instances, and enable cross-zone load balancing to redistribute traffic",
                    "Implement CloudWatch alarms monitoring ALB target response time per AZ, trigger Lambda functions to deregister all targets in the degraded AZ, and re-register them when performance recovers",
                    "Use Route 53 health checks to monitor each AZ endpoint and configure failover routing to redirect traffic away from degraded AZs",
                    "Enable ALB access logs, analyze them with Athena to detect slow AZs, and manually remove targets from degraded AZs"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch alarms with Lambda automation (B) provides AZ-level detection and automated response. ALB health checks (A) work at instance level not AZ level, Route 53 health checks (C) work at DNS level with slower propagation, and manual Athena analysis (D) is too slow for incident response."
            },
            {
                id: 60,
                scenario: "A company is implementing a global web application that needs to serve users in North America, Europe, and Asia-Pacific with low latency. The application uses EC2 instances behind ALBs in three AWS regions. The team wants to route users to the nearest region, handle regional failures by redirecting to the next closest region, and maintain session persistence across regions for logged-in users.",
                question: "Which combination of AWS services would BEST meet these requirements?",
                options: [
                    "Use Route 53 latency-based routing to direct users to the nearest region, configure health checks to detect regional failures and trigger failover, and use Amazon ElastiCache Global Datastore for cross-region session storage",
                    "Deploy CloudFront with multiple origins pointing to each regional ALB and use Lambda@Edge to handle session management",
                    "Use AWS Global Accelerator to route users to the nearest region with automatic failover, and Amazon DynamoDB Global Tables for cross-region session storage",
                    "Implement Route 53 geolocation routing to assign users to specific regions and use RDS cross-region read replicas for session data"
                ],
                correct: ["C"],
                multipleAnswers: false,
                explanation: "Global Accelerator (C) provides anycast routing to the nearest region with automatic failover using the AWS global network, and DynamoDB Global Tables provides low-latency cross-region session storage. Route 53 latency routing (A) uses DNS with slower failover, CloudFront (B) is optimized for content delivery not application routing, and geolocation routing (D) doesn't automatically handle failures."
            }
        ]
    },
    week7: {
        title: "Week 7: Logging and Scaling - Part 2",
        subtitle: "CloudWatch Monitoring and Logging",
        questions: [
            {
                id: 61,
                scenario: "A SaaS company operates a multi-tenant application where each customer has isolated resources. The operations team needs to monitor application performance, track custom business metrics (user logins, transactions processed, API calls per customer), and troubleshoot issues quickly. They only have basic EC2 metrics in CloudWatch. They want comprehensive monitoring including custom metrics, log aggregation, and the ability to correlate metrics with logs for troubleshooting.",
                question: "What combination of CloudWatch features would BEST meet these monitoring requirements? (Select TWO)",
                options: [
                    "Install the CloudWatch agent on EC2 instances to collect custom application metrics and logs, publishing them to CloudWatch Metrics and CloudWatch Logs",
                    "Use CloudWatch Embedded Metric Format (EMF) to publish custom metrics directly from application code along with detailed log context",
                    "Configure AWS X-Ray to trace all application requests and automatically generate metrics from trace data",
                    "Implement CloudWatch Synthetics to create canaries that monitor application endpoints and generate availability metrics",
                    "Use CloudWatch Logs Insights to query and analyze logs, creating metric filters to extract custom metrics from log data"
                ],
                correct: ["A", "B"],
                multipleAnswers: true,
                explanation: "CloudWatch agent (A) provides comprehensive metric and log collection, while EMF (B) allows embedding metrics in logs for correlation. X-Ray (C) is for tracing not custom business metrics, Synthetics (D) is for external monitoring not internal metrics, and Logs Insights (E) is for analysis not collection."
            },
            {
                id: 62,
                scenario: "Your company's production application has been experiencing intermittent performance issues that are difficult to reproduce. The application runs on EC2 instances and uses RDS. The operations team has basic CloudWatch metrics but lacks visibility into application-level performance. They need to establish a baseline of normal behavior and detect anomalies automatically without manually setting thresholds for hundreds of metrics.",
                question: "What CloudWatch feature would BEST help detect anomalies without manual threshold configuration?",
                options: [
                    "Create CloudWatch alarms with static thresholds based on the maximum observed values from the past 30 days",
                    "Enable CloudWatch Anomaly Detection on key metrics to automatically create dynamic baselines using machine learning, and create alarms that trigger when metrics deviate from the expected band",
                    "Use CloudWatch Logs Insights to query application logs every 5 minutes and trigger SNS notifications when error rates exceed 1%",
                    "Implement CloudWatch Contributor Insights to identify the top contributors to performance issues"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Anomaly Detection (B) uses ML to create dynamic baselines that adapt to patterns like daily/weekly cycles, eliminating manual threshold management. Static thresholds (A) require manual tuning and don't adapt to patterns, Logs Insights queries (C) require manual threshold definition, and Contributor Insights (D) identifies top contributors but doesn't detect anomalies."
            },
            {
                id: 63,
                scenario: "A company runs a critical financial application and needs to implement comprehensive security monitoring. They need to detect: failed login attempts exceeding 10 per minute, API calls made outside business hours, changes to IAM policies, and S3 bucket policy modifications. The security team wants real-time alerts and the ability to investigate incidents using log data.",
                question: "What combination of AWS services would BEST implement this security monitoring?",
                options: [
                    "Enable CloudTrail for API logging, create CloudWatch metric filters to detect security events from CloudTrail logs, configure CloudWatch alarms with SNS notifications, and use CloudWatch Logs Insights for investigation",
                    "Use Amazon GuardDuty to detect all security threats and configure EventBridge rules to send notifications for all GuardDuty findings",
                    "Implement AWS Security Hub with all security standards enabled and configure automated remediation for all findings",
                    "Enable VPC Flow Logs and use Athena to query them for suspicious network activity"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CloudTrail with CloudWatch metric filters, alarms, and Logs Insights (A) provides the specific detection capabilities required. GuardDuty (B) detects threats but doesn't cover all the specific scenarios like business hours violations, Security Hub (C) aggregates findings but doesn't provide the specific custom detections needed, and VPC Flow Logs (D) only cover network traffic."
            },
            {
                id: 64,
                scenario: "Your organization runs a containerized application on Amazon ECS with 20 services across multiple clusters. The operations team is experiencing intermittent performance issues but lacks visibility into container-level metrics like CPU, memory, network, and disk usage per container. They can see cluster-level metrics but need more granular data to identify which specific containers or tasks are causing problems.",
                question: "What should the team implement to gain comprehensive container-level monitoring?",
                options: [
                    "Enable CloudWatch Container Insights for the ECS clusters, which automatically collects metrics at the cluster, service, and task level, and integrates with CloudWatch Logs",
                    "Install the CloudWatch agent as a sidecar container in each task definition to collect and publish custom metrics",
                    "Use AWS X-Ray to instrument the containerized applications and collect performance data",
                    "Configure ECS task definitions to publish logs to CloudWatch Logs and create metric filters to extract performance data"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Container Insights (A) is purpose-built for container monitoring, providing automatic collection of detailed metrics at all levels with log integration. Sidecar agents (B) add complexity and overhead, X-Ray (C) is for tracing not infrastructure metrics, and metric filters (D) don't provide comprehensive container metrics."
            },
            {
                id: 65,
                scenario: "A company's application generates 50 GB of logs per day across 100 EC2 instances. The logs are currently stored locally on instances and lost when instances are terminated. The operations team needs to centralize logs, retain them for 2 years for compliance, enable fast searching for troubleshooting, and minimize storage costs for older logs. Logs older than 90 days are rarely accessed.",
                question: "What is the MOST cost-effective approach to meet these log management requirements?",
                options: [
                    "Configure the CloudWatch agent to stream all logs to CloudWatch Logs with a 2-year retention policy",
                    "Use the CloudWatch agent to stream logs to CloudWatch Logs, configure a 90-day retention in CloudWatch Logs, export logs older than 90 days to S3 with Glacier transition after 1 year",
                    "Install Elasticsearch on EC2 instances to index and store all logs for 2 years with fast search capability",
                    "Use AWS Kinesis Data Firehose to stream logs directly to S3 with Glacier transition after 90 days"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Logs for recent logs with S3/Glacier for older logs (B) balances searchability and cost. CloudWatch Logs is expensive for 2 years of 50GB/day (A), self-managed Elasticsearch (C) has high operational overhead, and Kinesis to S3 only (D) lacks the fast search capability needed for troubleshooting recent issues."
            },
            {
                id: 66,
                scenario: "Your company wants to implement a monitoring dashboard for their e-commerce application that shows real-time business metrics alongside technical metrics. Business stakeholders want to see: orders per minute, revenue per hour, cart abandonment rate, and payment success rate. Technical teams want to see: API response times, error rates, database query times, and infrastructure utilization. Both views should be on the same dashboard.",
                question: "How should this monitoring solution be implemented?",
                options: [
                    "Create two separate CloudWatch dashboards, one for business metrics and one for technical metrics, and share links with respective teams",
                    "Publish custom business metrics to CloudWatch using the PutMetricData API from the application, create a single CloudWatch dashboard combining business and technical metrics with appropriate widgets",
                    "Use Amazon QuickSight to create business dashboards from application database data and CloudWatch for technical metrics separately",
                    "Implement a third-party monitoring tool like Datadog that can combine business and technical metrics in a single dashboard"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Custom metrics via PutMetricData with a combined CloudWatch dashboard (B) provides a single pane of glass for both business and technical metrics. Separate dashboards (A) fragment visibility, QuickSight (C) adds complexity and latency for real-time metrics, and third-party tools (D) add cost and complexity when CloudWatch can handle this natively."
            },
            {
                id: 67,
                scenario: "A company's application uses Amazon RDS MySQL and the database team wants to monitor slow queries, connection counts, and replication lag. They also want to receive alerts when query execution time exceeds 5 seconds, when connections exceed 80% of the maximum, and when replication lag exceeds 30 seconds. The team wants to investigate slow queries using actual query text.",
                question: "What combination of RDS monitoring features would BEST meet these requirements?",
                options: [
                    "Enable RDS Enhanced Monitoring for OS-level metrics, enable Performance Insights to identify slow queries with actual SQL text, create CloudWatch alarms for connection count and replication lag metrics",
                    "Enable CloudWatch basic monitoring for RDS and create alarms for all required metrics",
                    "Use CloudWatch Logs to capture all RDS logs and create metric filters to detect slow queries",
                    "Implement a custom monitoring solution using Lambda functions that query the RDS performance_schema tables"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Enhanced Monitoring for OS metrics, Performance Insights for query analysis with SQL text, and CloudWatch alarms (A) provides comprehensive RDS monitoring. Basic CloudWatch monitoring (B) lacks query-level visibility, metric filters (C) can't capture query text, and custom Lambda solutions (D) add operational overhead."
            },
            {
                id: 68,
                scenario: "Your organization runs a serverless application using Lambda functions, API Gateway, and DynamoDB. The team wants to implement observability that provides: end-to-end request tracing, Lambda cold start detection, DynamoDB throttling alerts, and API Gateway error rate monitoring. They want to correlate issues across all three services when troubleshooting.",
                question: "What combination of AWS observability tools would provide the BEST end-to-end visibility?",
                options: [
                    "Enable AWS X-Ray tracing for Lambda and API Gateway, use CloudWatch Lambda Insights for detailed Lambda metrics including cold starts, create CloudWatch alarms for DynamoDB throttling and API Gateway errors",
                    "Use CloudWatch basic metrics for all services and create dashboards to visualize the data",
                    "Implement custom logging in each Lambda function and use CloudWatch Logs Insights to correlate logs across services",
                    "Use AWS CloudTrail to track all API calls across services and create CloudWatch alarms for error events"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "X-Ray for tracing, Lambda Insights for detailed Lambda metrics including cold starts, and CloudWatch alarms (A) provides comprehensive serverless observability with correlation capability. Basic metrics (B) lack cold start detection and tracing, custom logging (C) requires significant development effort, and CloudTrail (D) tracks management events not application performance."
            },
            {
                id: 69,
                scenario: "A company's operations team receives hundreds of CloudWatch alarms daily, many of which are false positives or low-priority notifications. The team is experiencing alert fatigue and missing critical issues. They want to implement alarm management that reduces noise, groups related alarms, and ensures critical issues are escalated appropriately while suppressing maintenance window alerts.",
                question: "What CloudWatch features would BEST address alarm fatigue?",
                options: [
                    "Delete all existing alarms and recreate only the most critical ones to reduce notification volume",
                    "Implement CloudWatch Composite Alarms to group related alarms and only alert when multiple conditions are met, use alarm suppression during maintenance windows, and configure different SNS topics for different severity levels",
                    "Increase alarm thresholds to reduce the frequency of alarm triggers",
                    "Use Amazon EventBridge to filter CloudWatch alarm notifications and only forward critical alarms to the operations team"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Composite alarms, maintenance window suppression, and severity-based routing (B) address all aspects of alarm fatigue. Deleting alarms (A) reduces visibility, increasing thresholds (C) might miss real issues, and EventBridge filtering (D) still generates the same number of alarms just filters notifications."
            },
            {
                id: 70,
                scenario: "Your company wants to implement proactive monitoring that detects potential issues before they impact users. The application serves 100,000 users and any downtime costs $10,000 per minute. The team wants to monitor: synthetic user journeys (login, search, checkout), real user performance metrics, and application health from multiple geographic locations. They want alerts before users are impacted.",
                question: "Which CloudWatch features would BEST implement proactive monitoring?",
                options: [
                    "Create CloudWatch alarms on EC2 CPU and memory metrics to detect infrastructure issues before they impact users",
                    "Use CloudWatch Synthetics to create canaries that simulate user journeys from multiple regions, CloudWatch RUM to collect real user metrics, and CloudWatch alarms to alert when synthetic tests fail or RUM metrics degrade",
                    "Implement CloudWatch Application Insights to automatically detect application issues and create alarms",
                    "Use Route 53 health checks to monitor application endpoints from multiple locations and configure DNS failover"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Synthetics for synthetic monitoring, RUM for real user metrics, and alarms (B) provides comprehensive proactive monitoring. Infrastructure alarms (A) detect issues after they occur, Application Insights (C) is reactive not proactive, and Route 53 health checks (D) only check endpoint availability not user experience."
            }
        ]
    },
    week8: {
        title: "Week 8: Monitoring and Troubleshooting - Part 1",
        subtitle: "CloudTrail, IAM, and Troubleshooting Methodology",
        questions: [
            {
                id: 71,
                scenario: "Your company's security team detected unusual API activity. Several S3 buckets containing sensitive data were accessed by an unknown IAM role, and some objects were deleted. The security team needs to investigate: who made the changes, when they occurred, what actions were taken, and from which IP addresses. CloudTrail is enabled with logs stored in S3, but manually searching through thousands of log files is time-consuming.",
                question: "What is the MOST efficient approach to investigate this security incident using CloudTrail?",
                options: [
                    "Download CloudTrail logs from S3 and use command-line tools like grep and jq to search for relevant events",
                    "Create a CloudTrail Lake event data store, import the relevant logs, and use SQL queries to analyze S3 API calls, filtering by event time, user identity, and source IP",
                    "Configure Amazon Athena to query CloudTrail logs directly in S3 using SQL, creating a table that maps to the log structure",
                    "Use AWS CloudTrail Event History in the console to search for S3 events, filtering by time range and event name"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudTrail Lake (B) provides the fastest and most powerful analysis with SQL queries, purpose-built for CloudTrail investigation. Athena (C) works but requires more setup, Event History (D) only shows 90 days and limited filtering, and manual log analysis (A) is time-consuming and error-prone."
            },
            {
                id: 72,
                scenario: "A developer reports that their Lambda function is failing with an AccessDeniedException when trying to write to a DynamoDB table. The Lambda function has an execution role with a policy that appears to grant DynamoDB write access. The function works in the development environment but fails in production. You need to diagnose the exact cause of the permission failure.",
                question: "What is the MOST efficient approach to diagnose this IAM permission issue?",
                options: [
                    "Add AdministratorAccess to the Lambda execution role temporarily to confirm it's a permissions issue, then narrow down the required permissions",
                    "Use the IAM Policy Simulator to test the Lambda execution role's permissions against the specific DynamoDB action and resource, and check for any SCPs or permission boundaries that might be restricting access",
                    "Review the DynamoDB table's resource-based policy and the Lambda execution role's identity-based policy manually to find discrepancies",
                    "Enable CloudTrail and wait for the next failure to capture the exact API call details in the logs"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "IAM Policy Simulator (B) tests the exact permissions including SCPs and permission boundaries, quickly identifying the root cause. Adding AdministratorAccess (A) is a security risk, manual policy review (C) is time-consuming and error-prone, and waiting for CloudTrail (D) delays resolution."
            },
            {
                id: 73,
                scenario: "Your organization has multiple AWS accounts managed through AWS Organizations. A security audit found that developers in member accounts are creating IAM users with console access and programmatic access keys, bypassing the company's requirement to use SSO for human access. The security team wants to prevent this behavior across all accounts without disrupting existing legitimate IAM usage for service accounts.",
                question: "What is the MOST effective approach to enforce this policy across all accounts?",
                options: [
                    "Send an email to all developers reminding them of the policy and schedule quarterly training sessions",
                    "Create a Service Control Policy (SCP) at the organization root that denies CreateUser and CreateAccessKey actions for users with console access, attach it to all OUs, and create exceptions for service account creation",
                    "Enable AWS Config rules in each account to detect IAM users with console access and automatically delete them",
                    "Implement IAM permission boundaries in each account that prevent developers from creating IAM users"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "SCPs at the organization level (B) provide preventive controls that apply to all accounts and cannot be overridden by account administrators. Email reminders (A) rely on human compliance, Config rules (C) are detective not preventive, and permission boundaries (D) must be applied per account and can be removed by account admins."
            },
            {
                id: 74,
                scenario: "A company's application is experiencing intermittent failures that are difficult to reproduce. The failures occur randomly, affect about 5% of requests, and the error messages are generic. The application runs on EC2 instances and uses multiple AWS services. The operations team has CloudWatch metrics showing elevated error rates but can't determine the root cause. They need a systematic approach to diagnose the issue.",
                question: "What troubleshooting methodology should the team follow?",
                options: [
                    "Restart all EC2 instances and clear application caches to resolve any transient issues, then monitor to see if the problem recurs",
                    "Define the problem precisely (5% failure rate, random occurrence), gather data (CloudWatch metrics, application logs, CloudTrail), form hypotheses about root causes, test each hypothesis systematically, and implement the fix for the confirmed root cause",
                    "Escalate immediately to AWS Support and wait for their diagnosis before taking any action",
                    "Deploy the latest application version to production to see if the issue resolves itself"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "A structured troubleshooting methodology (B) - define, gather data, hypothesize, test, fix - is the most effective approach for intermittent issues. Restarting instances (A) might temporarily mask the issue, escalating immediately (C) delays resolution, and deploying new versions (D) could introduce additional issues."
            },
            {
                id: 75,
                scenario: "Your company uses AWS CloudTrail and needs to ensure that CloudTrail logs cannot be tampered with or deleted by anyone, including administrators. The logs must be retained for 7 years for regulatory compliance. The security team also needs to be alerted immediately if anyone attempts to disable CloudTrail or modify the log storage configuration.",
                question: "What combination of controls would BEST protect CloudTrail log integrity?",
                options: [
                    "Store CloudTrail logs in S3 with versioning enabled and restrict access using bucket policies",
                    "Enable CloudTrail log file validation to detect tampering, store logs in S3 with Object Lock in compliance mode for 7 years, and create CloudWatch alarms triggered by CloudTrail events for StopLogging and DeleteTrail API calls",
                    "Encrypt CloudTrail logs with KMS and restrict KMS key access to only the security team",
                    "Use AWS Backup to create daily backups of CloudTrail logs and store them in a separate AWS account"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Log file validation, S3 Object Lock in compliance mode, and CloudWatch alarms (B) provide comprehensive protection: validation detects tampering, Object Lock prevents deletion even by admins, and alarms detect attempts to disable logging. Versioning (A) can be disabled by admins, KMS encryption (C) protects confidentiality not integrity, and backups (D) don't prevent tampering of originals."
            },
            {
                id: 76,
                scenario: "A company's EC2 instance is failing health checks and being replaced by Auto Scaling, but the new instances also fail health checks within minutes. The application logs show database connection errors. The team needs to quickly diagnose whether the issue is with the application code, the database, the network connectivity, or the instance configuration.",
                question: "What is the correct order of troubleshooting steps?",
                options: [
                    "Immediately replace the RDS database instance since the logs show database connection errors",
                    "Check EC2 instance system logs for boot errors, verify security group rules allow database connectivity, test database connectivity from the instance, check RDS instance status and CloudWatch metrics, then review application configuration",
                    "Redeploy the application from the last known good version and monitor if the issue resolves",
                    "Contact AWS Support to investigate the infrastructure issue since multiple instances are failing"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Systematic troubleshooting (B) starts with the most basic checks (instance boot, network) before investigating application and database layers. Replacing the database (A) is premature without diagnosis, redeploying (C) might not fix infrastructure issues, and contacting support (D) delays resolution when the team can diagnose it themselves."
            },
            {
                id: 77,
                scenario: "Your organization wants to implement a comprehensive audit trail for all AWS API activity across 20 accounts in an AWS Organization. The audit team needs to query logs from all accounts in a single interface, retain logs for 5 years, and generate compliance reports showing who accessed what resources and when. The current setup has separate CloudTrail trails in each account with logs stored in separate S3 buckets.",
                question: "What is the BEST approach to centralize and query audit logs across all accounts?",
                options: [
                    "Create an organization-level CloudTrail trail that delivers logs from all accounts to a central S3 bucket in the management account, then use CloudTrail Lake to create an event data store for cross-account querying",
                    "Continue with separate trails per account but create an Athena table in each account and use cross-account queries to aggregate data",
                    "Use AWS Config aggregator to collect configuration data from all accounts and use it as the audit trail",
                    "Implement a custom solution using Lambda functions that periodically copy logs from all account S3 buckets to a central location"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Organization-level CloudTrail with CloudTrail Lake (A) provides centralized logging and powerful SQL querying across all accounts. Separate Athena tables (B) require complex cross-account setup, Config aggregator (C) tracks configuration changes not API calls, and custom Lambda solutions (D) add operational overhead."
            },
            {
                id: 78,
                scenario: "A developer accidentally deleted an important DynamoDB table in production. The incident happened 2 hours ago and the team needs to: determine exactly what happened, restore the data, and implement controls to prevent this from happening again. The account has CloudTrail enabled but no DynamoDB point-in-time recovery was enabled.",
                question: "What steps should be taken to respond to this incident and prevent recurrence? (Select TWO)",
                options: [
                    "Use CloudTrail to identify the exact API call, user identity, and timestamp of the deletion to understand what happened",
                    "Restore the DynamoDB table from the most recent AWS Backup snapshot if backups were configured",
                    "Immediately terminate the IAM user who deleted the table as a security measure",
                    "Implement IAM policies that require MFA for DynamoDB DeleteTable operations and enable DynamoDB point-in-time recovery on all tables going forward",
                    "Contact AWS Support to restore the deleted DynamoDB table from AWS infrastructure backups"
                ],
                correct: ["A", "D"],
                multipleAnswers: true,
                explanation: "CloudTrail investigation (A) identifies what happened for the incident report, and implementing MFA requirements plus PITR (D) prevents recurrence. AWS Backup restore (B) only works if backups were configured, terminating the user (C) is premature without investigation, and AWS Support (E) cannot restore deleted DynamoDB tables."
            },
            {
                id: 79,
                scenario: "Your company's application uses an IAM role with a trust policy that allows EC2 instances to assume it. A security review found that the role has excessive permissions including s3:* and ec2:* on all resources. The security team wants to implement least privilege but doesn't know exactly which permissions the application actually uses. Modifying permissions incorrectly could break the production application.",
                question: "What is the SAFEST approach to implement least privilege for this IAM role?",
                options: [
                    "Remove all permissions from the role and add them back one by one as the application reports errors",
                    "Use IAM Access Analyzer to generate a policy based on CloudTrail activity logs showing which permissions the role actually used over the past 90 days, review the generated policy, and replace the overly permissive policy",
                    "Keep the current permissions but add a permission boundary that restricts the role to only the services the application uses",
                    "Create a new IAM role with minimal permissions and test it in a development environment before applying to production"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "IAM Access Analyzer policy generation (B) uses actual CloudTrail activity to generate a least-privilege policy based on real usage, minimizing the risk of breaking the application. Removing all permissions (A) will break production, permission boundaries (C) still leave excessive permissions, and dev testing (D) may not cover all production use cases."
            },
            {
                id: 80,
                scenario: "A company is implementing a zero-trust security model and wants to ensure that all cross-account access is properly controlled and audited. They have 15 AWS accounts and services in one account frequently need to access resources in other accounts. Currently, some cross-account access uses long-lived access keys stored in application configuration files. The security team wants to eliminate long-lived credentials and implement proper cross-account access.",
                question: "What is the BEST approach to implement secure cross-account access?",
                options: [
                    "Create IAM users in each target account with the required permissions and share the access keys securely using AWS Secrets Manager",
                    "Implement IAM roles with cross-account trust policies, use AWS STS AssumeRole for temporary credentials, and use CloudTrail to audit all cross-account role assumptions",
                    "Use VPC peering to connect all accounts and allow direct resource access without IAM credentials",
                    "Implement AWS Resource Access Manager (RAM) to share resources across accounts without requiring cross-account IAM roles"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Cross-account IAM roles with STS AssumeRole (B) provides temporary credentials, eliminates long-lived keys, and CloudTrail provides full auditability. IAM users with shared keys (A) still uses long-lived credentials, VPC peering (C) is for network connectivity not IAM access, and RAM (D) shares resources but doesn't replace IAM authentication."
            }
        ]
    },
    week9: {
        title: "Week 9: Monitoring and Troubleshooting - Part 2",
        subtitle: "Metrics, Container Insights, and Lambda Insights",
        questions: [
            {
                id: 81,
                scenario: "A company runs a containerized application on Amazon ECS with 20 services across multiple clusters. The operations team is experiencing intermittent performance issues but lacks visibility into container-level metrics like CPU, memory, network, and disk usage per container. They can see cluster-level metrics but need more granular data to identify which specific containers or tasks are causing problems.",
                question: "What should the team implement to gain comprehensive container-level monitoring?",
                options: [
                    "Enable CloudWatch Container Insights for the ECS clusters, which automatically collects metrics at the cluster, service, and task level, and integrates with CloudWatch Logs",
                    "Install the CloudWatch agent as a sidecar container in each task definition to collect and publish custom metrics",
                    "Use AWS X-Ray to instrument the containerized applications and collect performance data",
                    "Configure ECS task definitions to publish logs to CloudWatch Logs and create metric filters to extract performance data"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Container Insights (A) is purpose-built for container monitoring, providing automatic collection of detailed metrics at all levels with log integration. Sidecar agents (B) add complexity and overhead, X-Ray (C) is for tracing not infrastructure metrics, and metric filters (D) don't provide comprehensive container metrics."
            },
            {
                id: 82,
                scenario: "Your company runs Lambda functions that process customer orders. Recently, customers reported delayed order processing. Investigation revealed that Lambda functions were experiencing cold starts taking 8-12 seconds, causing timeouts. The functions use a Java runtime with large dependencies. The team needs to identify cold start frequency, duration, and which functions are most affected, then implement solutions.",
                question: "What approach would BEST address Lambda cold start monitoring and mitigation?",
                options: [
                    "Enable CloudWatch Lambda Insights to collect detailed metrics including cold start duration and frequency, then implement Provisioned Concurrency for the most critical functions to eliminate cold starts",
                    "Increase Lambda function timeout to 30 seconds to accommodate cold start duration",
                    "Migrate all Lambda functions from Java to Python or Node.js which have faster cold start times",
                    "Use CloudWatch alarms on Lambda duration metrics to detect when cold starts occur and trigger SNS notifications"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Lambda Insights for monitoring plus Provisioned Concurrency for mitigation (A) addresses both the visibility and the root cause. Increasing timeout (B) doesn't eliminate cold starts, migrating runtimes (C) requires significant refactoring, and alarms (D) only detect the problem without solving it."
            },
            {
                id: 83,
                scenario: "A company wants to implement cross-account, cross-region monitoring for their multi-account AWS environment. They have a production account, a staging account, and a development account across three regions. The operations team wants a single CloudWatch dashboard in a central monitoring account that shows metrics from all accounts and regions, with the ability to create alarms that trigger based on metrics from any account.",
                question: "How should cross-account cross-region monitoring be configured?",
                options: [
                    "Create separate CloudWatch dashboards in each account and region, then use browser tabs to monitor all environments simultaneously",
                    "Enable CloudWatch cross-account observability by configuring source accounts to share metrics with a monitoring account, then create a central dashboard and alarms in the monitoring account using metrics from all source accounts",
                    "Use AWS Systems Manager to collect metrics from all accounts and display them in a central Operations Center dashboard",
                    "Implement a custom solution using Lambda functions that copy CloudWatch metrics from all accounts to a central account every 5 minutes"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch cross-account observability (B) is the native AWS solution for this use case, allowing a monitoring account to view and alarm on metrics from multiple source accounts. Separate dashboards (A) don't provide unified visibility, Systems Manager (C) is for operational management not metrics aggregation, and custom Lambda (D) adds latency and operational overhead."
            },
            {
                id: 84,
                scenario: "Your application runs on Amazon EKS and the operations team wants to monitor pod-level metrics including CPU, memory, network I/O, and custom application metrics. They also want to correlate pod metrics with application logs and traces for troubleshooting. The team uses Prometheus for metrics collection in their on-premises environment and wants to maintain consistency.",
                question: "What monitoring solution would BEST meet these requirements for EKS?",
                options: [
                    "Enable CloudWatch Container Insights for EKS to automatically collect pod-level metrics and logs",
                    "Use Amazon Managed Service for Prometheus to collect Prometheus metrics from EKS, Amazon Managed Grafana for visualization, and CloudWatch Container Insights for log integration",
                    "Install the CloudWatch agent as a DaemonSet on EKS nodes to collect metrics and logs",
                    "Use AWS X-Ray for all monitoring needs including infrastructure metrics, logs, and traces"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Managed Prometheus with Managed Grafana (B) maintains consistency with existing Prometheus tooling while providing managed infrastructure. Container Insights (A) doesn't support Prometheus format, CloudWatch agent DaemonSet (C) doesn't support Prometheus metrics natively, and X-Ray (D) is for tracing not infrastructure metrics."
            },
            {
                id: 85,
                scenario: "A company's Lambda-based data processing pipeline is experiencing issues where some invocations fail silently without proper error logging. The functions process records from Kinesis streams and the team can't determine which records failed, why they failed, or how many retries occurred. They need comprehensive visibility into Lambda function behavior including errors, retries, and processing metrics.",
                question: "What combination of monitoring approaches would provide the BEST visibility into Lambda pipeline behavior?",
                options: [
                    "Enable CloudWatch Lambda Insights for detailed metrics, implement structured logging with correlation IDs in Lambda functions, configure dead-letter queues for failed invocations, and create CloudWatch alarms for error rates and iterator age",
                    "Increase Lambda function memory to reduce execution time and prevent timeouts",
                    "Use CloudWatch basic metrics to monitor Lambda invocations and errors",
                    "Implement AWS X-Ray tracing only to track all Lambda invocations and identify failures"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "Lambda Insights, structured logging, DLQs, and alarms (A) provides comprehensive visibility: Insights for detailed metrics, structured logging for debugging, DLQs to capture failed records, and alarms for proactive alerting. Increasing memory (B) doesn't improve visibility, basic metrics (C) lack detail, and X-Ray alone (D) doesn't capture all failure scenarios."
            },
            {
                id: 86,
                scenario: "Your company wants to implement custom metrics for their application that tracks business KPIs: number of active users per minute, transaction value per hour, and API calls per customer per day. These metrics need to be available in CloudWatch for alarming and dashboards. The application runs on EC2 instances and the team wants minimal code changes.",
                question: "What is the MOST efficient way to publish these custom metrics to CloudWatch?",
                options: [
                    "Write application logs in a structured format and create CloudWatch metric filters to extract the business metrics",
                    "Use the CloudWatch PutMetricData API directly from the application code to publish custom metrics with appropriate dimensions",
                    "Install the CloudWatch agent and configure it to collect custom metrics from application log files",
                    "Use Amazon Kinesis Data Streams to collect application events and process them with Lambda to publish metrics to CloudWatch"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "PutMetricData API (B) is the most direct and efficient way to publish custom metrics with full control over metric names, values, and dimensions. Metric filters (A) require log parsing and have limited dimension support, CloudWatch agent (C) is better for system metrics, and Kinesis (D) adds unnecessary complexity for simple metric publishing."
            },
            {
                id: 87,
                scenario: "A company runs a microservices application on ECS and wants to implement CloudWatch anomaly detection for their key metrics. They have 50 services each with 10 key metrics. The team wants to detect anomalies in response time, error rate, and throughput for each service. They also want to create alarms that trigger when metrics deviate significantly from the expected baseline, accounting for daily and weekly traffic patterns.",
                question: "What is the BEST approach to implement anomaly detection at this scale?",
                options: [
                    "Manually set static thresholds for each of the 500 metrics based on historical data",
                    "Enable CloudWatch Anomaly Detection on key metrics for each service, create anomaly detection alarms that trigger when metrics fall outside the expected band, and use CloudWatch metric math to create composite metrics where needed",
                    "Use Amazon DevOps Guru to automatically detect anomalies across all services without manual configuration",
                    "Implement a custom ML model using Amazon SageMaker to detect anomalies in CloudWatch metrics"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Anomaly Detection with anomaly detection alarms (B) automatically learns patterns including daily/weekly cycles and scales to 500 metrics. Static thresholds (A) require manual tuning and don't adapt to patterns, DevOps Guru (C) is for application-level insights not metric-level anomaly detection, and custom SageMaker models (D) add significant operational overhead."
            },
            {
                id: 88,
                scenario: "Your organization's operations team wants to troubleshoot a performance issue with an ECS service. The service processes API requests and response times have increased from 200ms to 2000ms over the past week. Container Insights shows CPU and memory are within normal ranges. The team needs to identify whether the issue is in the application code, database queries, or external API calls.",
                question: "What troubleshooting approach would MOST efficiently identify the root cause?",
                options: [
                    "Restart the ECS service to clear any memory leaks or connection pool issues",
                    "Enable AWS X-Ray tracing for the ECS service to create service maps and trace individual requests, identifying which component (application, database, external API) is contributing to the increased latency",
                    "Increase the ECS task CPU and memory allocation to provide more resources to the service",
                    "Review CloudWatch Container Insights metrics for the past week to identify when the performance degradation started"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray tracing (B) provides request-level visibility showing exactly which component is slow, with service maps showing the complete request flow. Restarting (A) might temporarily fix but doesn't identify root cause, increasing resources (C) doesn't help if the issue is in code or external calls, and Container Insights (D) shows infrastructure metrics not application-level latency breakdown."
            },
            {
                id: 89,
                scenario: "A company wants to monitor their AWS Lambda functions for cost optimization. They have 200 Lambda functions with varying memory configurations. Some functions are over-provisioned (using 1GB memory but only needing 256MB), while others are under-provisioned causing timeouts. The team wants to right-size Lambda memory configurations to optimize cost and performance.",
                question: "What approach would BEST help right-size Lambda memory configurations?",
                options: [
                    "Set all Lambda functions to 128MB memory (the minimum) and increase only when functions report out-of-memory errors",
                    "Use CloudWatch Lambda Insights to analyze actual memory utilization per function, use AWS Compute Optimizer recommendations for Lambda to identify over and under-provisioned functions, and adjust configurations accordingly",
                    "Use AWS Cost Explorer to identify the most expensive Lambda functions and reduce their memory allocation",
                    "Implement a Lambda function that monitors other Lambda functions and automatically adjusts memory based on utilization"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Lambda Insights for utilization data plus Compute Optimizer recommendations (B) provides data-driven right-sizing. Setting all to minimum (A) will cause failures, Cost Explorer (C) shows cost but not utilization patterns, and a custom monitoring Lambda (D) adds complexity when AWS provides native tools."
            },
            {
                id: 90,
                scenario: "Your company's CloudWatch bill has increased significantly due to high custom metric volume and frequent API calls. Investigation reveals that 50 Lambda functions are each publishing 20 custom metrics every minute, resulting in 60,000 PutMetricData API calls per hour. The team wants to reduce CloudWatch costs without losing important visibility.",
                question: "What is the MOST cost-effective approach to reduce CloudWatch costs while maintaining visibility?",
                options: [
                    "Reduce the frequency of metric publishing from every minute to every 5 minutes for all Lambda functions",
                    "Use CloudWatch Embedded Metric Format (EMF) to publish metrics as structured log data, which is cheaper than PutMetricData API calls, and consolidate related metrics using metric dimensions",
                    "Remove all custom metrics and rely only on default Lambda metrics provided by CloudWatch",
                    "Migrate all custom metrics to a third-party monitoring solution to avoid CloudWatch costs"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "EMF (B) publishes metrics as log data which is significantly cheaper than PutMetricData API calls, and dimensions allow consolidating multiple metrics. Reducing frequency (A) loses granularity, removing custom metrics (C) loses business visibility, and third-party tools (D) add cost and complexity."
            }
        ]
    },
    week10: {
        title: "Week 10: Monitoring and Troubleshooting - Part 3",
        subtitle: "Log Analysis, VPC Flow Logs, and Application Monitoring",
        questions: [
            {
                id: 91,
                scenario: "A company's security team suspects that one of their EC2 instances may be compromised and communicating with external malicious IP addresses. They need to analyze network traffic patterns to identify suspicious connections. The VPC has VPC Flow Logs enabled and stored in CloudWatch Logs, but the team needs to efficiently query millions of log entries to find connections to specific IPs, unusual port usage, rejected connection attempts, and traffic volume patterns over time.",
                question: "What is the MOST effective way to analyze VPC Flow Logs for this security investigation?",
                options: [
                    "Use CloudWatch Logs Insights to write queries that filter and aggregate flow log data, searching for specific IPs, ports, and connection patterns",
                    "Export flow logs to S3 and use Amazon Athena to query the data using SQL",
                    "Create CloudWatch metric filters to extract specific patterns from flow logs and visualize them in dashboards",
                    "Use AWS GuardDuty to automatically analyze flow logs and detect malicious activity"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CloudWatch Logs Insights (A) provides fast, interactive querying of flow logs with powerful filtering and aggregation, ideal for investigation. Athena (B) works but has more latency, metric filters (C) are for ongoing monitoring not investigation, and GuardDuty (D) is complementary but doesn't provide the detailed query capability needed."
            },
            {
                id: 92,
                scenario: "Your company's web application is experiencing intermittent 502 errors reported by users. The application runs on EC2 instances behind an ALB. The operations team needs to determine whether the errors are caused by the ALB, the EC2 instances, or the application itself. They have ALB access logs stored in S3 and application logs in CloudWatch Logs.",
                question: "What is the MOST efficient approach to diagnose the 502 errors?",
                options: [
                    "Restart all EC2 instances behind the ALB to clear any application errors",
                    "Use CloudWatch Logs Insights to query application logs for errors, use Athena to query ALB access logs for 502 responses and identify which targets are returning errors, then correlate the timing with application log entries",
                    "Increase ALB idle timeout to prevent connection timeouts that might cause 502 errors",
                    "Enable ALB access logging and wait for more 502 errors to accumulate before analyzing"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Querying both ALB access logs and application logs (B) allows correlation to identify whether errors originate at the ALB or application level. Restarting instances (A) might mask the issue, increasing timeout (C) is a guess without diagnosis, and waiting for more errors (D) delays resolution."
            },
            {
                id: 93,
                scenario: "A company wants to implement log-based alerting for their application. They need to detect: more than 100 failed login attempts per minute (potential brute force), any occurrence of the string 'CRITICAL ERROR' in application logs, and database query times exceeding 5 seconds. The application logs are stored in CloudWatch Logs and the team wants real-time alerts.",
                question: "What is the BEST approach to implement these log-based alerts?",
                options: [
                    "Create CloudWatch metric filters for each pattern, publish metrics to CloudWatch, and create alarms that trigger SNS notifications when thresholds are exceeded",
                    "Use CloudWatch Logs Insights to run scheduled queries every minute and trigger Lambda functions when patterns are detected",
                    "Export logs to S3 and use Athena scheduled queries to detect patterns and send SNS notifications",
                    "Implement a Lambda function that reads CloudWatch Logs streams in real-time and sends alerts when patterns are detected"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "CloudWatch metric filters with alarms (A) is the native, real-time solution for log-based alerting. Logs Insights queries (B) have minimum 1-minute intervals and require Lambda integration, Athena (C) adds latency and complexity, and custom Lambda (D) requires managing stream reading and adds operational overhead."
            },
            {
                id: 94,
                scenario: "Your organization runs a multi-tier application and wants to implement CloudWatch Application Insights for automated problem detection. The application uses EC2 instances, RDS, ELB, and Lambda. The team wants Application Insights to automatically detect and alert on application issues, correlate metrics and logs across components, and provide root cause analysis. They want to minimize manual configuration.",
                question: "How should CloudWatch Application Insights be configured for this application?",
                options: [
                    "Manually configure monitoring for each resource individually in CloudWatch",
                    "Create an Application Insights application, add the resource group containing all application components, enable automatic configuration, and configure SNS notifications for detected problems",
                    "Use CloudWatch Container Insights instead since it provides better application monitoring",
                    "Implement custom CloudWatch dashboards with metrics from all components"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Application Insights with automatic configuration (B) automatically discovers and monitors all components in the resource group, correlates issues, and provides root cause analysis with minimal manual setup. Manual configuration (A) defeats the purpose of Application Insights, Container Insights (C) is for containers not general applications, and custom dashboards (D) require manual setup and don't provide automated problem detection."
            },
            {
                id: 95,
                scenario: "A company's application generates structured JSON logs with fields including timestamp, user_id, action, duration_ms, status_code, and error_message. The operations team wants to analyze these logs to: find the top 10 slowest API endpoints, calculate error rates by endpoint, identify users experiencing the most errors, and detect unusual patterns in user behavior. They want to run these analyses on-demand and schedule daily reports.",
                question: "What is the BEST approach to analyze these structured logs?",
                options: [
                    "Parse logs manually using grep and awk commands on the EC2 instances",
                    "Use CloudWatch Logs Insights with queries that parse JSON fields, aggregate by endpoint and user, calculate statistics, and schedule queries using EventBridge for daily reports",
                    "Export logs to S3 and use Amazon Athena with a table schema matching the JSON structure for SQL-based analysis",
                    "Use Amazon OpenSearch Service to index logs and create Kibana dashboards for visualization"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Logs Insights (B) natively parses JSON logs, supports aggregation and statistics, and can be scheduled via EventBridge. Manual parsing (A) is impractical at scale, Athena (C) works but requires S3 export and schema management, and OpenSearch (D) is powerful but adds significant operational overhead for this use case."
            },
            {
                id: 96,
                scenario: "Your company wants to implement Live Tail in CloudWatch Logs to monitor application logs in real-time during deployments and incident response. The application generates high-volume logs across 20 log groups. During a recent deployment, the team needed to monitor logs from 5 specific log groups simultaneously to detect issues. They want to filter logs in real-time to focus on errors and warnings.",
                question: "How should CloudWatch Logs Live Tail be used effectively for this scenario?",
                options: [
                    "Create a separate CloudWatch dashboard for each log group and monitor them in separate browser tabs",
                    "Use CloudWatch Logs Live Tail to stream logs from multiple log groups simultaneously with filter patterns to show only ERROR and WARNING level messages, enabling real-time monitoring during deployments",
                    "Set up CloudWatch alarms on all log groups and monitor the alarm dashboard during deployments",
                    "Use CloudWatch Logs Insights to run queries every 30 seconds during deployments to check for errors"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Live Tail (B) provides real-time log streaming from multiple log groups with filtering, ideal for deployment monitoring. Separate dashboards (A) fragment visibility, alarms (C) have delays and don't show log content, and repeated Insights queries (D) have minimum intervals and don't provide true real-time visibility."
            },
            {
                id: 97,
                scenario: "A company's VPC Flow Logs show a large volume of REJECT entries for traffic on port 443 from external IP addresses to their EC2 instances. The security team needs to determine if this is a port scan, DDoS attempt, or legitimate traffic being blocked by misconfigured security groups. They need to analyze the pattern of rejected connections and take appropriate action.",
                question: "What is the correct approach to analyze and respond to this situation?",
                options: [
                    "Immediately block all external traffic to the VPC using a network ACL",
                    "Use CloudWatch Logs Insights to query flow logs and analyze the rejected traffic: count unique source IPs, check request frequency per IP, identify geographic distribution, then use AWS WAF or Security Groups to block malicious IPs if confirmed as an attack",
                    "Ignore the REJECT entries since they indicate the security groups are working correctly",
                    "Enable AWS Shield Standard to automatically mitigate the potential DDoS attack"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Analyzing flow logs before taking action (B) ensures the response is appropriate. Blocking all external traffic (A) would break legitimate access, ignoring REJECT entries (C) misses potential security threats, and Shield Standard (D) is already enabled by default and doesn't require action, but the team should still investigate the pattern."
            },
            {
                id: 98,
                scenario: "Your company wants to implement log anomaly detection for their application logs stored in CloudWatch Logs. The application generates millions of log entries daily and the operations team wants to automatically detect unusual log patterns without manually reviewing all logs. They want to be alerted when new error patterns appear or when the frequency of known errors increases significantly.",
                question: "What CloudWatch feature would BEST implement automated log anomaly detection?",
                options: [
                    "Create CloudWatch metric filters for all known error patterns and set static thresholds for alarms",
                    "Enable CloudWatch Logs Anomaly Detection on the log groups to automatically detect unusual patterns and new log anomalies using ML, and configure notifications for detected anomalies",
                    "Use CloudWatch Logs Insights to run scheduled queries that count error occurrences and compare with historical baselines",
                    "Implement a Lambda function that reads log streams and uses Amazon Comprehend to detect unusual patterns"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "CloudWatch Logs Anomaly Detection (B) uses ML to automatically detect unusual patterns and new anomalies without manual threshold configuration. Metric filters (A) only detect known patterns, scheduled queries (C) require manual baseline management, and custom Lambda with Comprehend (D) adds significant complexity."
            },
            {
                id: 99,
                scenario: "A company uses CloudWatch Synthetics to monitor their e-commerce application. They have canaries that test the login flow, product search, and checkout process. Recently, the checkout canary started failing intermittently. The team needs to investigate whether the failure is due to application bugs, network issues, or the canary script itself. They need to see exactly what the canary experienced during the failed run.",
                question: "What information should the team review to diagnose the canary failure?",
                options: [
                    "Check CloudWatch metrics for the EC2 instances running the application to see if there were resource constraints during the failure",
                    "Review the canary run reports including screenshots, HAR files, and logs from the failed runs to see exactly what the canary experienced, then compare with successful runs to identify differences",
                    "Increase the canary timeout to prevent failures caused by slow page loads",
                    "Disable the failing canary and manually test the checkout flow to verify if the issue exists"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Canary run reports with screenshots and HAR files (B) provide the most detailed view of what the canary experienced, allowing comparison between successful and failed runs. EC2 metrics (A) show infrastructure but not the user experience, increasing timeout (C) is a guess without diagnosis, and disabling the canary (D) removes monitoring coverage."
            },
            {
                id: 100,
                scenario: "Your organization wants to implement a comprehensive log management strategy for compliance and security. Requirements include: all logs must be encrypted at rest, logs must be immutable for 7 years, logs from all accounts must be centralized, and the security team must be able to search logs quickly for incident response. The organization has 25 AWS accounts generating various types of logs.",
                question: "What architecture would BEST meet all these log management requirements?",
                options: [
                    "Store all logs in CloudWatch Logs in each account with 7-year retention and KMS encryption",
                    "Centralize all logs in a dedicated logging account S3 bucket with KMS encryption, S3 Object Lock in compliance mode for 7 years, use CloudTrail Lake for CloudTrail logs, and CloudWatch Logs Insights or Athena for searching",
                    "Use AWS Backup to back up all CloudWatch Logs to a central account daily",
                    "Implement a third-party SIEM solution to centralize and manage all logs"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Centralized S3 with KMS encryption, Object Lock for immutability, and search capabilities (B) meets all requirements. CloudWatch Logs in each account (A) doesn't provide centralization or immutability, AWS Backup (C) creates copies but doesn't provide immutability or centralization, and third-party SIEM (D) adds cost and complexity when AWS native tools can meet the requirements."
            }
        ]
    },
    week11: {
        title: "Week 11: Monitoring and Troubleshooting - Part 4",
        subtitle: "Distributed Tracing with AWS X-Ray",
        questions: [
            {
                id: 101,
                scenario: "A microservices application consists of 8 services deployed on Lambda and ECS, communicating via API Gateway and SQS queues. Users are reporting intermittent slow response times (5-10 seconds instead of 1-2 seconds), but the issue is difficult to reproduce and doesn't affect all requests. The development team needs to identify which service in the chain is causing the latency and understand the complete request flow.",
                question: "What approach would BEST help identify the source of intermittent latency in this distributed system?",
                options: [
                    "Implement AWS X-Ray tracing across all services to visualize the complete request path, identify slow segments, and analyze latency distributions with service maps and trace timelines",
                    "Enable detailed CloudWatch logging in all services and use CloudWatch Logs Insights to correlate logs by request ID",
                    "Configure CloudWatch Application Insights to automatically detect and analyze application issues",
                    "Use CloudWatch ServiceLens to combine X-Ray traces with CloudWatch metrics and logs for comprehensive observability"
                ],
                correct: ["D"],
                multipleAnswers: false,
                explanation: "CloudWatch ServiceLens (D) combines X-Ray tracing with metrics and logs, providing the most comprehensive view for troubleshooting distributed systems. X-Ray alone (A) provides tracing but ServiceLens adds metric correlation, log correlation (B) is manual and time-consuming, and Application Insights (C) is more for monolithic applications."
            },
            {
                id: 102,
                scenario: "Your company's X-Ray service map shows that a downstream service is causing high latency. The service makes calls to DynamoDB and an external payment API. X-Ray traces show that 95% of the latency is in the payment API calls, but you need to understand the pattern: is it all calls or specific types of transactions? You need to filter and analyze traces to find the pattern.",
                question: "How should X-Ray filter expressions be used to analyze this latency pattern?",
                options: [
                    "Download all X-Ray traces to S3 and use Athena to query them for patterns",
                    "Use X-Ray filter expressions to query traces by response time threshold, HTTP status codes, and custom annotations added to payment API calls, then use X-Ray Analytics to compare latency distributions between transaction types",
                    "Create CloudWatch alarms on X-Ray metrics for the payment service and wait for patterns to emerge",
                    "Add more logging to the payment service and use CloudWatch Logs Insights to analyze the logs"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray filter expressions and Analytics (B) allow targeted analysis of traces by multiple criteria, enabling comparison between transaction types. S3/Athena (A) adds unnecessary complexity, CloudWatch alarms (C) detect issues but don't help analyze patterns, and more logging (D) doesn't provide the request-flow visibility that X-Ray offers."
            },
            {
                id: 103,
                scenario: "A company is implementing X-Ray tracing for their application for the first time. The application has 15 microservices, some running on Lambda, some on ECS, and some on EC2. They want to implement tracing with minimal code changes, ensure traces are correlated across all services, and control sampling rates to manage costs. High-value transactions should always be traced while routine health checks should be sampled at 1%.",
                question: "What is the correct approach to implement X-Ray tracing across this heterogeneous environment?",
                options: [
                    "Implement X-Ray SDK in every service with custom sampling rules, use X-Ray daemon on EC2 and ECS, enable active tracing on Lambda, and configure sampling rules in the X-Ray console to trace 100% of high-value transactions and 1% of health checks",
                    "Enable X-Ray on all services with 100% sampling to ensure no traces are missed",
                    "Use X-Ray only for Lambda functions since they have native integration and implement custom logging for EC2 and ECS services",
                    "Implement X-Ray tracing only for the entry point service (API Gateway) and rely on CloudWatch for downstream service monitoring"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "X-Ray SDK with daemon, Lambda active tracing, and custom sampling rules (A) provides complete coverage with cost control. 100% sampling (B) is expensive at scale, Lambda-only tracing (C) misses EC2 and ECS services, and entry-point only tracing (D) doesn't provide visibility into downstream services."
            },
            {
                id: 104,
                scenario: "Your application uses X-Ray for distributed tracing. The development team wants to add business context to traces so they can filter and analyze traces by customer ID, transaction type, and order value. This would allow them to investigate issues reported by specific customers and analyze performance by transaction type. The application is built with Python.",
                question: "How should business context be added to X-Ray traces?",
                options: [
                    "Add business context as structured log entries in CloudWatch Logs and correlate with X-Ray traces using request IDs",
                    "Use X-Ray SDK for Python to add annotations (indexed, searchable key-value pairs) for customer ID and transaction type, and metadata (non-indexed) for order value and other details to trace segments",
                    "Create separate X-Ray groups for each customer and transaction type",
                    "Use X-Ray sampling rules to create separate sampling configurations for each transaction type"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray annotations for searchable fields and metadata for additional context (B) is the correct approach. Annotations are indexed and can be used in filter expressions, while metadata stores additional non-searchable data. Log correlation (A) is indirect, separate groups (C) are for filtering not adding context, and sampling rules (D) control which traces are captured not what data they contain."
            },
            {
                id: 105,
                scenario: "A company's X-Ray traces show that their application makes 50 calls to DynamoDB for a single user request, resulting in high latency. The development team needs to understand the call pattern, identify which calls are redundant, and optimize the data access pattern. They want to use X-Ray insights to guide their optimization efforts.",
                question: "How should X-Ray be used to analyze and optimize the DynamoDB access pattern?",
                options: [
                    "Enable DynamoDB CloudWatch metrics and create dashboards to monitor read/write capacity consumption",
                    "Use X-Ray service map to visualize the relationship between the application and DynamoDB, analyze individual traces to see all 50 DynamoDB calls with their duration and parameters, use X-Ray Analytics to identify patterns in the calls, then implement caching or batch operations based on findings",
                    "Add more DynamoDB read capacity units to handle the high request volume",
                    "Use DynamoDB Accelerator (DAX) to cache all DynamoDB reads without analyzing the access pattern"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray service map and trace analysis (B) reveals the exact call pattern, enabling targeted optimization. CloudWatch metrics (A) show aggregate data not individual call patterns, adding capacity (C) doesn't reduce the number of calls, and DAX (D) helps with caching but without understanding the pattern you might cache unnecessarily."
            },
            {
                id: 106,
                scenario: "Your organization wants to implement X-Ray tracing for a Python-based Lambda function that processes orders. The function calls RDS, S3, and an external shipping API. You need to trace all downstream calls automatically, add custom subsegments for business logic sections, and ensure the trace context is propagated to any other Lambda functions invoked by this function.",
                question: "What is the correct implementation approach for X-Ray in this Lambda function?",
                options: [
                    "Use the AWS X-Ray SDK for Python, patch all AWS SDK clients using aws_xray_sdk.core.patch_all(), add custom subsegments using xray_recorder.begin_subsegment() for business logic, and enable active tracing in the Lambda configuration to automatically propagate trace context",
                    "Manually add X-Ray trace headers to all outbound HTTP requests and AWS SDK calls",
                    "Use CloudWatch Lambda Insights instead of X-Ray since it provides better Lambda monitoring",
                    "Implement X-Ray only for the external shipping API calls since AWS service calls are automatically traced"
                ],
                correct: ["A"],
                multipleAnswers: false,
                explanation: "X-Ray SDK with patch_all(), custom subsegments, and active tracing (A) provides complete automatic instrumentation with custom business context. Manual header addition (B) is error-prone and doesn't work for AWS SDK calls, Lambda Insights (C) provides metrics not tracing, and partial tracing (D) misses AWS service call visibility."
            },
            {
                id: 107,
                scenario: "A company's distributed application is experiencing issues where some requests fail with errors in downstream services. The operations team uses X-Ray but finds it difficult to identify which traces contain errors across thousands of traces per minute. They want to automatically detect groups of traces that share common error patterns and receive notifications when new error patterns emerge.",
                question: "What X-Ray feature would BEST help identify and monitor error patterns?",
                options: [
                    "Manually review X-Ray traces in the console filtering by error status",
                    "Enable X-Ray Insights to automatically detect anomalies in trace data, identify groups of traces with common error patterns, and configure notifications when new insights are created",
                    "Create CloudWatch alarms on X-Ray error rate metrics and review traces manually when alarms trigger",
                    "Use X-Ray filter expressions to search for error traces and export them to S3 for analysis"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray Insights (B) automatically detects anomalies and groups related error traces, providing proactive notification of new patterns. Manual review (A) doesn't scale, CloudWatch alarms (C) detect errors but don't group related traces, and exporting to S3 (D) adds latency and complexity."
            },
            {
                id: 108,
                scenario: "Your company wants to implement VPC Reachability Analyzer to troubleshoot network connectivity issues. A new application deployment is failing because EC2 instances in a private subnet cannot reach an RDS database in another private subnet. The network team suspects a misconfigured route table or security group but isn't sure where the issue is. The VPC has multiple subnets, route tables, security groups, and NACLs.",
                question: "How should VPC Reachability Analyzer be used to diagnose this connectivity issue?",
                options: [
                    "Manually review all route tables, security groups, and NACLs in the VPC to find the misconfiguration",
                    "Create a Reachability Analyzer path analysis from the EC2 instance to the RDS database, run the analysis, and review the results which will identify the exact component (route table, security group, NACL) blocking connectivity",
                    "Use VPC Flow Logs to capture rejected traffic and identify which security group is blocking the connection",
                    "Create a test EC2 instance in the same subnet as RDS and try to connect from the application instance"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Reachability Analyzer (B) automatically analyzes the network path and identifies the exact blocking component without sending actual traffic. Manual review (A) is time-consuming and error-prone, VPC Flow Logs (C) show rejected traffic but don't identify the specific misconfiguration, and test instances (D) confirm the issue but don't identify the cause."
            },
            {
                id: 109,
                scenario: "A company's application team wants to implement X-Ray tracing for cross-account tracing. The application spans three AWS accounts: a frontend account (API Gateway, Lambda), a backend account (ECS services), and a data account (RDS, DynamoDB). Traces need to be correlated across all three accounts and visible in a single X-Ray console view. The security team requires that each account maintains control over its own trace data.",
                question: "How should cross-account X-Ray tracing be implemented?",
                options: [
                    "Consolidate all services into a single AWS account to simplify X-Ray tracing",
                    "Configure X-Ray in each account to send traces to a central monitoring account using cross-account IAM roles, enable trace context propagation between services using X-Ray trace headers, and use CloudWatch cross-account observability to view traces from all accounts in the monitoring account",
                    "Use a third-party APM tool that supports multi-account tracing",
                    "Implement custom trace correlation by passing trace IDs in application headers and correlating them manually"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "Cross-account IAM roles with trace context propagation and CloudWatch cross-account observability (B) enables unified tracing while maintaining account-level control. Consolidating accounts (A) defeats the multi-account architecture, third-party tools (C) add cost and complexity, and manual correlation (D) is error-prone and doesn't scale."
            },
            {
                id: 110,
                scenario: "Your company has implemented X-Ray across their entire application stack. The X-Ray service map shows 25 services with complex dependencies. The team wants to use X-Ray data to: identify the critical path in request processing, find services with the highest error rates, detect performance regressions after deployments, and generate SLA compliance reports showing P50, P90, and P99 latencies for each service.",
                question: "How should X-Ray Analytics and the X-Ray API be used to meet these requirements?",
                options: [
                    "Manually review the X-Ray service map daily and export data to Excel for reporting",
                    "Use X-Ray Analytics to analyze trace data and identify critical paths and error rates, use X-Ray GetTraceSummaries API with filter expressions to retrieve latency percentiles, create CloudWatch dashboards with X-Ray metrics for deployment regression detection, and schedule Lambda functions to generate SLA reports using X-Ray API data",
                    "Use CloudWatch metrics only since X-Ray data is too complex for reporting",
                    "Implement a third-party APM tool to generate the required reports from X-Ray data"
                ],
                correct: ["B"],
                multipleAnswers: false,
                explanation: "X-Ray Analytics for pattern analysis, GetTraceSummaries API for percentiles, CloudWatch dashboards for regression detection, and Lambda for scheduled reports (B) provides comprehensive observability and reporting. Manual review (A) doesn't scale, CloudWatch metrics alone (C) lack trace-level detail, and third-party tools (D) add unnecessary complexity."
            }
        ]
    }
};
