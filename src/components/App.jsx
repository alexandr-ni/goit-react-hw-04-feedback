import { Fragment, useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistic } from './Statistic/Statistic';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const clickButton = click => {
    if (click.target.textContent === 'Good') {
      setFeedbacks(prevFeedback => ({
        ...prevFeedback,
        good: feedbacks.good + 1,
      }));
    } else if (click.target.textContent === 'Neutral') {
      setFeedbacks(prevFeedback => ({
        ...prevFeedback,
        neutral: feedbacks.neutral + 1,
      }));
    } else if (click.target.textContent === 'Bad') {
      setFeedbacks(prevFeedback => ({
        ...prevFeedback,
        bad: feedbacks.bad + 1,
      }));
    }
  };

  const countTotalFeedback = () =>
    feedbacks.good + feedbacks.neutral + feedbacks.bad;

  function countPositiveFeedbackPercentage() {
    if (countTotalFeedback() !== 0) {
      return Math.round((feedbacks.good * 100) / countTotalFeedback()) + '%';
    }
  }

  return (
    <Fragment>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedbacks)}
          onLeaveFeedback={clickButton}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistic
            good={feedbacks.good}
            neutral={feedbacks.neutral}
            bad={feedbacks.bad}
            total={countTotalFeedback(feedbacks)}
            positivePercentage={countPositiveFeedbackPercentage(
              feedbacks.good,
              countTotalFeedback(feedbacks)
            )}
          />
        )}
      </Section>
    </Fragment>
  );
};
