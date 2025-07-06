import { FEEDBACK_QUESTION } from '@/shared/api/endpoints';

export type FeedbackQuestionType = {
  name: string;
  phone: string;
  email_feed: string;
  text: string;
}

export async function postFeedbackQuestion(data: FeedbackQuestionType) {
  const { email_feed, ...rest } = data;

  const payload = {
    ...rest,
    email: email_feed,
  };

  const res = await fetch(FEEDBACK_QUESTION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  return {
    status: res.status,
    data: json,
  };
}
