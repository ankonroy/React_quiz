import { Fragment } from 'react';
import Checkbox from '../checkbox/Checkbox';
import classes from './Answers.module.css';

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              text={option.title}
              value={index}
              checked={option.checked}
              onChange={(e) => handleChange(e, index)}
              key={index}
            />
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                    ? classes.wrong
                    : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
              key={index}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
