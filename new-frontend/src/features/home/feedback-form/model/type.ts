import {FeedbackQuestionType} from "@/shared/api/feedback/postFeedbackQuestion"
export type FeedbackType = FeedbackQuestionType & {
  agreement: boolean;
}