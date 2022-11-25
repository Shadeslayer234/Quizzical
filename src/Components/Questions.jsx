import React from 'react'

const Questions = props =>{

    const answers = props.answers
    // console.log(props.correctAnswer)

    // if(props.checked){
        // }
        const stylesTrue = {
            backgroundColor:  "#D6DBF6" 
        }

    const styleAdd = id =>{
        if(props.index[id].selected){
            if(props.correctAnswer === answers[id].answer){
                return {backgroundColor:  "#94D7A2"}
            }
            else{
               return {backgroundColor : "#F8BCBC"} 
            }
        }
        else{
            if(props.correctAnswer === answers[id].answer){
                return {backgroundColor:  "#94D7A2"}
            }
            else{
                return {backgroundColor:  "transparent"}
            }
        }

    }

// props.correctAnswer === answers[0].answer ? "#F8BCBC" : RED
// "#D6DBF6" 
// "#94D7A2" Green 
    const stylesFalse = {
        backgroundColor:"transparent"
    }
    

    return(
        <>
        {props.checked ? 
        
        <div className='quiz'>
            <h3>{props.question}</h3>

            <div className='answer-container'>
                <p className='answers' style={styleAdd(0) } onClick={()=> props.handleClick(props.id,props.index[0].id) }>{answers[0].answer}</p>
                <p className='answers' style={styleAdd(1) } onClick={()=> props.handleClick(props.id,props.index[1].id) }>{answers[1].answer}</p>
                <p className='answers' style={styleAdd(2) } onClick={()=> props.handleClick(props.id,props.index[2].id) }>{answers[2].answer}</p>
                <p className='answers' style={styleAdd(3) } onClick={()=> props.handleClick(props.id,props.index[3].id) }>{answers[3].answer}</p>
            </div>
        </div>
        :

        <div className='quiz'>
            <h3>{props.question}</h3>

            <div className='answer-container'>
                <p className='answers' style={props.index[0].selected ? stylesTrue : stylesFalse } onClick={()=> props.handleClick(props.id,props.index[0].id) }>{answers[0].answer}</p>
                <p className='answers' style={props.index[1].selected ? stylesTrue : stylesFalse } onClick={()=> props.handleClick(props.id,props.index[1].id) }>{answers[1].answer}</p>
                <p className='answers' style={props.index[2].selected ? stylesTrue : stylesFalse } onClick={()=> props.handleClick(props.id,props.index[2].id) }>{answers[2].answer}</p>
                <p className='answers' style={props.index[3].selected ? stylesTrue : stylesFalse } onClick={()=> props.handleClick(props.id,props.index[3].id) }>{answers[3].answer}</p>
            </div>
        </div>
        
        
        }                                                                                       
        </>
    )
}

export default Questions