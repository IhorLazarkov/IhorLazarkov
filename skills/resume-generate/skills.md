# Skill: Generate Resume

## Description
This skill helps create a professional resume by:
- Structuring experience within the last 10 years.
- Pruning older projects (>10 years) while retaining recent ones.
- Integrating all experiences (even from past projects) into a cohesive summary and achievements.

---

## Key Guidelines

### **Source Data**
- **Professional Experience & Achievements:** Source data from `/Users/ilazarkov/Development/VSCodeProjects/prototyping/my-github-profile/skills/resume-generate/Resume.md`. Extract job titles, companies, dates, responsibilities, and achievements.
- **Projects:** Filter projects listed in `Resume.md` (e.g., under "Recent Projects" or a dedicated section). Only include those within the last 10 years.
- **Summary & Key Skills:** Combine all relevant data from `Resume.md` into a cohesive summary. Highlight transferable skills and achievements using action verbs like:
  - "Developed," "Led," "Optimized," "Improved," "Designed."

---

### **1. Professional Experience**
#### **≤10 Years Old:**
- Include full details: job title, company, dates, responsibilities, and achievements.
- Use bullet points for readability.

#### **>10 Years Old:**
- Prune years but retain the project entry (e.g., "2014–2016" → "2014–2015").
- Omit outdated projects unless they are highly relevant to current skills.
---

### **2. Projects**
- Only include projects within the last 10 years.
- Exclude older projects entirely if they lack relevance.
---

### **3. Summary & Achievements**
- Combine all experiences (past/present) into a summary.
- Highlight transferable skills and key accomplishments using action verbs like:
  - "Developed," "Led," "Optimized," "Improved," "Designed."
---

## Example Workflow

1. **Extract Experience:**
   - Gather details from all projects (past/present).
   - Filter by the 10-year rule.

2. **Structure Resume Sections:**
   - **Professional Experience:** List jobs with ≤10 years of tenure.
   - **Projects:** Include only recent projects.
   - **Summary:** Combine relevant skills and achievements.
