// Cloud Operations 2 Practice Questions - Interactive Application with Immediate Feedback

class ExamApp {
    constructor() {
        this.currentWeek = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;
        this.init();
    }

    init() {
        this.renderWeekSelector();
        this.attachEventListeners();
    }

    renderWeekSelector() {
        const selector = document.getElementById('weekSelector');
        const weeks = Object.keys(questionsDB);

        selector.innerHTML = weeks.map((week, index) => `
            <button class="week-btn" data-week="${week}">
                Week ${index + 1}
            </button>
        `).join('');
    }

    attachEventListeners() {
        // Week selection
        document.getElementById('weekSelector').addEventListener('click', (e) => {
            if (e.target.classList.contains('week-btn')) {
                this.loadWeek(e.target.dataset.week);
            }
        });
    }

    loadWeek(weekKey) {
        this.currentWeek = weekKey;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.score = 0;

        // Update active button
        document.querySelectorAll('.week-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.week === weekKey) {
                btn.classList.add('active');
            }
        });

        // Hide welcome, show questions
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('questionContainer').classList.add('active');

        this.renderQuestion();
    }

    renderQuestion() {
        const week = questionsDB[this.currentWeek];
        const question = week.questions[this.currentQuestionIndex];
        const container = document.getElementById('questionContainer');

        const optionsHTML = question.options.map((option, index) => {
            const label = String.fromCharCode(65 + index); // A, B, C, D, E
            return `
                <div class="option" data-option="${label}">
                    <div class="option-label">${label}.</div>
                    <div class="option-text">${option}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <div class="question-number">Question ${question.id}</div>
                    <div class="question-progress">${this.currentQuestionIndex + 1} of ${week.questions.length}</div>
                </div>
                
                <div class="scenario">
                    <strong>Scenario:</strong> ${question.scenario}
                </div>
                
                <div class="question-text">
                    ${question.question}
                    ${question.multipleAnswers ? '<br><em style="color: #ff6b6b; font-weight: 600;">⚠️ Select EXACTLY TWO answers</em>' : ''}
                </div>
                
                <div class="options" id="options">
                    ${optionsHTML}
                </div>
                
                <div class="feedback" id="feedback"></div>
                
                <div class="controls">
                    <button class="btn btn-secondary" id="prevBtn" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="btn btn-primary" id="nextBtn" style="display: none;">
                        ${this.currentQuestionIndex < week.questions.length - 1 ? 'Next Question →' : 'View Results →'}
                    </button>
                </div>
            </div>
        `;

        this.attachQuestionListeners(question);
    }

    attachQuestionListeners(question) {
        const optionsContainer = document.getElementById('options');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        let selectedOptions = [];
        let answered = false;

        // Option selection with IMMEDIATE feedback
        optionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.option');
            if (!option || answered) return;

            const optionLabel = option.dataset.option;

            if (question.multipleAnswers) {
                // Multiple selection
                if (selectedOptions.includes(optionLabel)) {
                    selectedOptions = selectedOptions.filter(o => o !== optionLabel);
                    option.classList.remove('selected');
                } else if (selectedOptions.length < 2) {
                    selectedOptions.push(optionLabel);
                    option.classList.add('selected');

                    // Auto-check when 2 options selected
                    if (selectedOptions.length === 2) {
                        answered = true;
                        this.checkAnswerImmediately(question, selectedOptions);
                        nextBtn.style.display = 'block';
                    }
                }
            } else {
                // Single selection - IMMEDIATE feedback on click!
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedOptions = [optionLabel];

                // Immediately show if correct or wrong
                answered = true;
                this.checkAnswerImmediately(question, selectedOptions);
                nextBtn.style.display = 'block';
            }
        });

        // Next question
        nextBtn.addEventListener('click', () => {
            const week = questionsDB[this.currentWeek];
            if (this.currentQuestionIndex < week.questions.length - 1) {
                this.currentQuestionIndex++;
                this.renderQuestion();
            } else {
                this.showResults();
            }
        });

        // Previous question
        prevBtn.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.renderQuestion();
            }
        });
    }

    checkAnswerImmediately(question, selectedOptions) {
        const correctAnswers = Array.isArray(question.correct) ? question.correct : [question.correct];
        const isCorrect = selectedOptions.length === correctAnswers.length &&
            selectedOptions.every(opt => correctAnswers.includes(opt));

        if (isCorrect) {
            this.score++;
        }

        // Highlight ALL options - show correct and incorrect
        document.querySelectorAll('.option').forEach(option => {
            const label = option.dataset.option;

            if (correctAnswers.includes(label)) {
                // This is a correct answer - always highlight green
                option.classList.add('correct');
                option.innerHTML = `
                    <div class="option-label">✓ ${label}.</div>
                    <div class="option-text">${option.querySelector('.option-text').textContent}</div>
                `;
            } else if (selectedOptions.includes(label)) {
                // User selected this but it's wrong - highlight red
                option.classList.add('incorrect');
                option.innerHTML = `
                    <div class="option-label">✗ ${label}.</div>
                    <div class="option-text">${option.querySelector('.option-text').textContent}</div>
                `;
            } else {
                // Not selected and not correct - dim it
                option.style.opacity = '0.5';
            }

            option.style.pointerEvents = 'none';
        });

        // Show immediate feedback with animation
        const feedback = document.getElementById('feedback');
        feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;

        if (isCorrect) {
            feedback.innerHTML = `
                <div style="font-size: 1.5em; margin-bottom: 10px;">🎉 Correct!</div>
                <strong>Explanation:</strong> ${question.explanation}
            `;
        } else {
            feedback.innerHTML = `
                <div style="font-size: 1.5em; margin-bottom: 10px;">❌ Incorrect</div>
                <strong>Correct Answer${correctAnswers.length > 1 ? 's' : ''}:</strong> ${correctAnswers.join(', ')}<br><br>
                <strong>Explanation:</strong> ${question.explanation}
            `;
        }

        // Scroll to feedback
        setTimeout(() => {
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    showResults() {
        const week = questionsDB[this.currentWeek];
        const percentage = Math.round((this.score / week.questions.length) * 100);
        const container = document.getElementById('questionContainer');

        let performanceMsg = '';
        let emoji = '';
        if (percentage >= 90) {
            performanceMsg = 'Outstanding Performance!';
            emoji = '🌟';
        } else if (percentage >= 80) {
            performanceMsg = 'Great Job!';
            emoji = '🎉';
        } else if (percentage >= 70) {
            performanceMsg = 'Good Work!';
            emoji = '👍';
        } else if (percentage >= 60) {
            performanceMsg = 'Keep Practicing!';
            emoji = '📚';
        } else {
            performanceMsg = 'Review and Try Again!';
            emoji = '💪';
        }

        container.innerHTML = `
            <div class="score-summary">
                <div style="font-size: 4em; margin-bottom: 20px;">${emoji}</div>
                <h3>Week ${this.currentWeek.replace('week', '')} Complete!</h3>
                <div class="score-display">${this.score} / ${week.questions.length}</div>
                <p style="font-size: 2em; margin: 20px 0; font-weight: 700; color: ${percentage >= 70 ? '#28a745' : '#dc3545'};">${percentage}%</p>
                <p style="font-size: 1.3em; color: #667eea; font-weight: 600;">${performanceMsg}</p>
                
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h4 style="color: #667eea; margin-bottom: 15px;">Performance Breakdown</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; text-align: center;">
                        <div>
                            <div style="font-size: 2em; color: #28a745;">${this.score}</div>
                            <div style="color: #666;">Correct</div>
                        </div>
                        <div>
                            <div style="font-size: 2em; color: #dc3545;">${week.questions.length - this.score}</div>
                            <div style="color: #666;">Incorrect</div>
                        </div>
                        <div>
                            <div style="font-size: 2em; color: #667eea;">${percentage}%</div>
                            <div style="color: #666;">Score</div>
                        </div>
                    </div>
                </div>
                
                ${percentage < 80 ? `
                    <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px; text-align: left;">
                        <strong>💡 Tip:</strong> Review the explanations for questions you missed. Aim for 80%+ to ensure you're ready for the exam!
                    </div>
                ` : ''}
                
                <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="app.loadWeek('${this.currentWeek}')">
                        🔄 Retry This Week
                    </button>
                    <button class="btn btn-secondary" onclick="location.reload()">
                        🏠 Back to Home
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ExamApp();
});
