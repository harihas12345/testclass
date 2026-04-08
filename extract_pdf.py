import PyPDF2

def extract_pdf_text(pdf_path):
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text

# Extract the syllabus
syllabus_text = extract_pdf_text('Cloud Operations 2 Syllabus.pdf')
with open('syllabus.txt', 'w', encoding='utf-8') as f:
    f.write(syllabus_text)
print("Syllabus extracted and saved to syllabus.txt")

# Extract the exam guide
exam_guide_text = extract_pdf_text('exam_guide.pdf')
with open('exam_guide.txt', 'w', encoding='utf-8') as f:
    f.write(exam_guide_text)
print("Exam guide extracted and saved to exam_guide.txt")

print("\n" + "="*50)
print("SYLLABUS:")
print("="*50)
print(syllabus_text)

print("\n" + "="*50)
print("EXAM GUIDE:")
print("="*50)
print(exam_guide_text)
