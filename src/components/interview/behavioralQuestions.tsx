import { Box, Card, Typography, Button } from "@mui/material";
import { useState } from "react";

const questions = [
  "Describe a time when you had to make a technical decision that went against customer preferences. How did you balance customer needs with technical constraints?",
  "Tell me about a situation where you went above and beyond to ensure a great user experience for a software product. What did you do, and what was the outcome?",
  "Give an example of a time when you took ownership of a software project or task that was outside your normal responsibilities. How did you approach it, and what was the impact?",
  'Tell me about a time when you recognized a technical issue that was "not your job" but you took it upon yourself to resolve it. What motivated you to do that?',
  "Give me an example of a complex problem you solved with a simple solution. What made the problem complex? How do you know your solution addressed the problem?",
  "Discuss a time when you explored a new programming language, framework, or technology to solve a problem. What was the motivation, and what did you learn?",
  "Tell me about a situation where you identified a gap in your technical knowledge and took steps to address it. How did you go about it, and what was the outcome?",
  "Describe a time when you had to deliver difficult feedback to a colleague or team member. How did you approach the conversation, and what was the outcome?",
  "Tell me about a situation where you were vocally self-critical about a technical decision or mistake.",
  "Describe a time when you had to audit or investigate a complex technical issue. How did you approach the problem, and what did you discover?",
  "Tell me about a situation where you had to stay connected to the details of a software project, even as the scope and complexity grew. How did you manage that?",
  "Describe a time when you had to respectfully challenge a technical decision made by your manager or a senior leader. How did you handle that situation?",
  "Tell me about a situation where you disagreed with a team's approach, but ultimately committed to supporting the decision. What was your thought process?",
  "Describe a time when you had to deliver a high-quality software product or feature on a tight timeline. How did you and your team accomplish that?",
  "Tell me about a situation where you had to overcome significant setbacks or obstacles to deliver critical engineering work. How did you respond?",
  "Who was your most difficult customer?",
  "Give me an example of a time when you did not meet a client's expectation. What happened, and how did you attempt to rectify the situation?",
  "When you're working with a large number of customers, it's tricky to deliver excellent service to them all. How do you go about prioritizing your customers needs?",
  "Tell the story of the last time you had to apologize to someone.",
  "Tell me about a time when you had to leave a task unfinished.",
  "Tell me about a time when you had to work on a project with unclear responsibilities.",
  "Give me an example of when you took a risk and it failed.",
  "Tell me about a time when you gave a simple solution to a complex problem.",
  "Tell me about a time when you created a new way of doing something that gave a company a competitive advantage.",
  "Tell me about an out of the box idea you had and what was its impact?",
  "Tell me about a time when you influenced a change by only asking questions.",
  "Tell me about a time when you solved a problem through just superior knowledge or observation.",
  "What would you do if you found out that your closest friend at work was stealing.",
  "Tell me about a time when you had to tell someone a harsh truth.",
  "Tell me a time when you earned trust of a group.",
  "Tell me a time when you devised a new way of looking at data that helped improve performance.",
  "Describe a time when you had to personally resolve a challenging technical situation which should have been done by one of your employees.",
  "Tell me about a time when you had to dive deep into the data and the results you achieved.",
  "Tell me about an unpopular decision of yours.",
  "Tell me about a time when you had to step up and disagree with a team members approach.",
  "If your direct manager was instructing you to do something you disagreed with, how would you handle it?",
  "By providing an example, tell me when you have had to handle a variety of assignments. Describe the results.",
  "Give me an example of a time when you were 75% of the way through a project, and you had to pivot strategy—how were you able to make that into a success story?",
  "Tell me about a time where you overcame an obstacle and delivered results.",
];

export const BehavioralQuestions = () => {
  const [question, setQuestion] = useState("");

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setQuestion(questions[randomIndex]);
  };
  return (
    <Card>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: 2,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Interview answers
        </Typography>
        <Button variant="contained" color="primary" onClick={getRandomQuestion}>
          Show Random Question
        </Button>
        {question && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {question}
          </Typography>
        )}
      </Box>
    </Card>
  );
};
