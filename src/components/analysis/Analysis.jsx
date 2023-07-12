import Questions from '../question/Questions';
import classes from './Analysis.module.css';

export default function Analysis({ answers }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <Questions answers={answers} />
    </div>
  );
}
