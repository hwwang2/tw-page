export type TvInfo = {
    id: number;
    author: string;
    content: number;
    createTime: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'display' | 'hidden';
    label: string;
};