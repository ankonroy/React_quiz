import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import Analysis from '../components/analysis/Analysis';
import Summary from '../components/summary/Summary';
import useAnswers from '../hooks/useAnswers';

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  // const { qna } = state;

  const { loading, error, answers } = useAnswers(id);

  // console.log(answers);
  // console.log(state);

  function calculate() {
    let score = 0;

    answers.forEach((question, index1) => {
      const correctIndexes = [];
      const checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (state[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score += 5;
      }
    });
    return score;
  }

  const userScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
