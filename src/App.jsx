import React from 'react'
import Intro from './Components/Intro'
import Questions from './Components/Questions'
import He from 'he'


function shuffleArray(array) {
  const newArr = array
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr
}

// var decodeHtmlEntity = function(str) {
//   return str.replace(/&#(\d+);/g, function(match, dec) {
//     return String.fromCharCode(dec);
//   });
// };

String.fromHtmlEntities = function(string) {
    return (string+"").replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    })
};

function App() {
  
  const [quizStarted,setQuizStarted] = React.useState(false)
  const [questions,setQuestions] = React.useState([])  
  const [getData,setGetData] = React.useState(true)
  const [answers,setAnswers] = React.useState([])
  const [answersChecked,setAnswersChecked] = React.useState(false)
  const [correct,setCorrect] = React.useState(0)
  
  
  React.useEffect(()=>{
    const fetching = async()=>{
      const fetchedObj = await fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=hard&type=multiple")
      const respone = await fetchedObj.json()
      const data = respone.results
      const newArray = []
      const answerArr = []
      for(let i = 0; i < 5;i++){
        const answers = []
        const allAnswers =[...data[i].incorrect_answers,data[i].correct_answer]
        for(let j = 0; j < 4 ;j++){
          answers.push({answer:He.decode(allAnswers[j]),id:j,selected:false})
      }
        newArray.push({question:He.decode(data[i].question),answers:shuffleArray(answers) , id:i , correctAnswer:data[i].correct_answer})
        answerArr.push(data[i].correct_answer)
      }
      setQuestions(newArray)
      setAnswers(answerArr)
    }
    fetching()
    

  },[getData])



  const select = (id,index) => {
    setQuestions( prevState=> (
    prevState.map(question=>{
      if(question.id === id){
        return {
          ...question,
          answers:question.answers.map(answer => {
            return{
              ...answer,
              selected:answer.id === index ? !answer.selected : false
            }
          })
        }
      }
      else{
        return question
      }
    })
  ))
  }

  
  const quizStart = () =>{
    setQuizStarted(prevState => !prevState)
  }
  
  const checkAnswers = () =>{
    const newArr = []
    let count = 0
    for(let i = 0; i < questions.length; i++){
      const question = questions[i].answers
      for(let j=0; j < question.length;j++){
        question[j].selected && newArr.push(question[j].answer)
      }
    }

    for(let i = 0; i < answers.length;i++){
      if(answers[i] === newArr[i]){
        count=count+1
      }
    }
    console.log('Clicked on the check answers button')
    console.log('The answers were')
    console.log(...newArr)
    console.log('The correct answers were')
    console.log(...answers)
    console.log(`The number of currect answers ${count}`)
    setAnswersChecked(prevState => !prevState)
    setCorrect(count)
  }


///Rendering Logic
  const replay = ()=>{
    setGetData(prevState=>!prevState)
    setAnswersChecked(prevState=>!prevState)
  }

  const questionElements = questions.map((item) =>{

    return(
      <Questions question={item.question} answers={item.answers} key={item.id} id={item.id} handleClick = {select} index={item.answers} correctAnswer={item.correctAnswer} checked={answersChecked}/>
    )
  }
  )

  return (
    <main className='main'>
    {/* {quizStarted ? questionElements : <Intro quizStart={quizStart}/>}
    {!quizStarted ? 
    <button onClick={quizStart} className='quiz-btn'>Start quiz</button>
    : <button className='quiz-btn' onClick={checkAnswers}>Check answers</button>} */}
    {answersChecked ? 
      <div className='main-inner'>
      {questionElements}
      <div>
      <span className='score'>You scored {correct}/5 correct answers</span>
      <button className='quiz-btn' onClick={replay}>Play again</button>
      </div>
      </div>
      :
      <div className='main-inner'>
    {quizStarted ? questionElements : <Intro quizStart={quizStart}/>}
    {!quizStarted ? 
    <button onClick={quizStart} className='quiz-btn'>Start quiz</button>
    : <button className='quiz-btn' onClick={checkAnswers}>Check answers</button>}
    </div>
    }
    </main>
    
  )
}

export default App
