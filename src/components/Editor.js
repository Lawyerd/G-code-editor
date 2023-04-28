import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import SubmitButton from './SubmitButton';
import "../css/Editor.css"
// import { javascript } from '@codemirror/lang-javascript';
// import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
function Editor() {
  // eslint-disable-next-line
  const [input, setInput] = useState('example')
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState([]);
  const onChange = React.useCallback((value, viewUpdate) => {
    setInput(value);
  }, []);

  const validateCode = (code) => {
    const lines = code.split("\n"); // 코드를 한 줄씩 나누어 배열로 만듦
    const newErrors = []; // 새로운 에러를 담을 배열

    // 각 줄을 검사하면서 에러가 있는지 확인
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("X")) {
        const error = {
          line: i + 1, // 몇 번째 줄에서 에러가 발생했는지 저장
          message: `'X'가 발견되었습니다.`,
        };
        newErrors.push(error); // 새로운 에러를 배열에 추가
      }
    }
    setErrors(newErrors); // 새로운 에러 배열을 state에 저장
  };

  const decorateCode = (code) => {

  }

  function getBlocks(str) {
    const lines = str.split('\n'); // 마침표 다음에 공백 문자를 추가하여 분리
    let lineBlocks = [];
    for (const line of lines) {
      let blocks;
      const blockRegex = /%|\([^()]*\)|[A-Za-z](?:-?\d+(?:\.\d*)?|\.\d*)?(?:\s+\d+(?:\.\d*)?|\s*\.\d*)*|\s*.*/g;
      blocks = line.match(blockRegex);
      const filteredBlocks = blocks.filter(block => block.trim() !== "");
      lineBlocks.push(filteredBlocks)
    }
    return lineBlocks
  }

  function printBySequence(blocks) {
    let currentSeq = "";
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.startsWith("N")) {
        currentSeq = block;
        console.log(`[${currentSeq}]`);
      } else {
        console.log("["+currentSeq+"] " + block);
      }
    }
  }

  const submit = () => {
    console.log('Submit!')
    setResult(input);
    validateCode(input);
    let blocks = getBlocks(input);
    console.log("")
    console.log(blocks)
    // printBySequence(blocks);
  }

  return (
    <div>
      <CodeMirror
        value="example"
        height="200px"
        theme="dark"
        // extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />

      <SubmitButton onClick={submit} />

      <div className='result-console'>
        <div className='result'>{result.split('\n').map((item, key) => {
          return <span key={key}>{item}<br /></span>
        })}</div>
      </div>

      <div className='error-console'>
        <ul className='error'> {errors.map((error, index) => (
          <li key={index}> ⛔ Line {error.line}: {error.message}</li>
        ))}</ul>
      </div>
    </div>


  );
}


export default Editor;