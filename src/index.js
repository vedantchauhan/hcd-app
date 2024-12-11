import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
/*const resolver = new Resolver();

resolver.define('fetchLabels', async (req) => {
  const key = req.context.extension.issue.key;

  const res = await api.asUser().requestJira(route`/rest/api/3/issue/${key}?fields=labels`);

  const data = await res.json();

  const label = data.fields.labels;
  if (label == undefined) {
    console.warn(`${key}: Failed to find labels`);
    return [];
  }

  return label;
});

export const handler = resolver.getDefinitions();*/

const resolver = new Resolver();

resolver.define('getIssueDetails', async (req) => {
  const issueKey = req.context.extension.issue.key;
  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`);
  const data = await response.json();

  return {
    summary: data.fields.summary,
    description: data.fields.description,
  };
});

export const handler = resolver.getDefinitions();
