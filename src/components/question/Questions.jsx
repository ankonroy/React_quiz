import Answers from '../answers/Answers';
import classes from './Question.module.css';

export default function Questions({ answers = [] }) {
  return answers.map((answer, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers input={false} options={answer.options} />
    </div>
  ));
}
