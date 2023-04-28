import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import SubmitButton from './SubmitButton';
import validateCode from '../Functions/ValidateCode'
import colorWord from '../Functions/ColorBlock';
import "../css/Editor.css"
function Editor() {
  // eslint-disable-next-line
  const [input, setInput] = useState('example')
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState([]);
  const onChange = React.useCallback((value, viewUpdate) => {
    setInput(value);
  }, []);




  function getWords(str) {
    const blocks = str.split('\n'); // 마침표 다음에 공백 문자를 추가하여 분리
    let currentBlockWords = [];
    for (const line of blocks) {
      let words;
      const wordRegex = /%|\([^()]*\)|[A-Za-z](?:-?\d+(?:\.\d*)?|\.\d*)?(?:\s+\d+(?:\.\d*)?|\s*\.\d*)*|\s*.*/g;
      words = line.match(wordRegex);
      const filteredWords = words.filter(word => word.trim() !== "");
      currentBlockWords.push(filteredWords)
    }
    // console.log(lineBlocks)
    return currentBlockWords
  }


  const submit = () => {
    console.log('Submit!')
    let blocks = getWords(input);
    validateCode(blocks, setErrors);
    setResult(blocks)
  }

  return (
    <div>
      <div className='code'>
        <div className='input-console'>
          <CodeMirror
            value="example"
            height="380px"
            theme="dark"
            mode="gcode"
            // extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />

          <SubmitButton onClick={submit} />
        </div>


        <div className='result-console'>
          <div className='result'>
            {result.map((block, index) => (
              <p key={index}>
                {block.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ color: colorWord(word) }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>


      </div>




      <div className='error-console'>
        <ul className='error'> {errors.map((error, index) => (
          <li key={index}> {error.state==="warning"?'❗':'⛔'} Line {error.line}: {error.message}</li>
        ))}</ul>
      </div>
    </div>


  );
}


export default Editor;