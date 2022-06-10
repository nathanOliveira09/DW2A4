export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
    userName: string;
    userMail: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}