import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = e => {
    const review = e.target.textContent;
    switch (review) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
    }
  };

  function getTotalSum() {
    return good + neutral + bad;
  }

  function countPositiveFeedbackPercentage() {
    if (good === 0) {
      return 0;
    }
    const result = (good / getTotalSum()) * 100;
    return Math.round(result);
  }

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          addFeedback={addFeedback}
          options={['good', 'neutral', 'bad']}
        />
      </Section>
      {(Boolean(getTotalSum()) && (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={getTotalSum()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )) || <Notification message="There is no feedback"></Notification>}
    </div>
  );
};
