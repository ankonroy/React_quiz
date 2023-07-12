import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Answers from '../components/answers/Answers';
import MiniPlayer from '../components/miniplayer/MiniPlayer';
import ProgressBar from '../components/progressBar/ProgressBar';
import { useAuth } from '../context/AuthContext';
import useOuestions from '../hooks/useQuestions';

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case 'questions':
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case 'answer':
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz(props) {
  const { id } = useParams();
  const { loading, error, questions } = useOuestions(id);
  // console.log(questions);
  const [currentQuestion, setCurrentQuestions] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { videoTitle } = state;

  // console.log(videoTitle);
  // const { videoTitle } = state;

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // handle when user clicks the next button to get the next question

  function nextQuestion() {
    if (currentQuestion <= questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent + 1);
    }
    // console.log(currentQuestion, questions);
  }

  // handle when user clicks the previous button to get back to the pre question

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent - 1);
    }
    // console.log(currentQuestion, questions);
  }

  // submit quiz

  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, {
      state: {
        ...qna,
      },
    });
  }

  // calculate percentage of progress

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentage}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
