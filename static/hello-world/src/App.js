import React, { useEffect, useState } from 'react';
import { events, invoke, requestJira } from '@forge/bridge';

/*function App() {
  const [data, setData] = useState(null);

  const handleFetchSuccess = (data) => {
    setData(data);
    if (data.length === 0) {
      throw new Error('No labels returned');
    }
  };
  const handleFetchError = () => {
    console.error('Failed to get label');
  };

  useEffect(() => {
    const fetchLabels = async () => invoke('fetchLabels');
    fetchLabels().then(handleFetchSuccess).catch(handleFetchError);
    const subscribeForIssueChangedEvent = () =>
      events.on('JIRA_ISSUE_CHANGED', () => {
        fetchLabels().then(handleFetchSuccess).catch(handleFetchError);
      });
    const subscription = subscribeForIssueChangedEvent();

    return () => {
      subscription.then((subscription) => subscription.unsubscribe());
    };
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  const labels = data.map((label) => <div>{label}</div>);
  return (
    <div>
      <span>Issue labels:</span>
      <div>{labels}</div>
    </div>
  );
}

export default App;*/

const App = () => {
  const [issueDetails, setIssueDetails] = useState({ summary: '', description: '' });
  const [recommendations, setRecommendations] = useState('');

useEffect(() => {
  const fetchIssueDetails = async () => {
    const response = await invoke('getIssueDetails');
    setIssueDetails({
      summary: response.summary,
      description: response.description,
    });

    const recs = generateRecommendations(response.summary, response.description);
    setRecommendations(recs);
  };

  fetchIssueDetails();
}, []);

const generateRecommendations = (summary, description) => {
  // Your logic to generate recommendations based on the summary and description
  let recommendation = 'Not an HCD';
  response = openai.Completion.create(
      engine='gpt-3.5-turbo',
      prompt=f"{summary} + {description}",
      max_tokens=60,
      n=1,
      stop=None,
      temperature=0.7,
    )

    recommendation = response.choices[0].text.strip()

    /*if (summary.includes('app layout') || description.includes('')) {
      recommendation = 'This is an HCD. It belongs in the usability HCD category.';
    } else if (summary.includes('feature') || description.includes('feature')) {
      recommendation = 'Ensure thorough documentation.';
    }*/

    return recommendation;
  //return `Recommendations for ${summary}: ...`;
};

return (
  <div>
    <h3>Classification</h3>
    <p>{recommendations}</p>
  </div>
);
};

export default App;
