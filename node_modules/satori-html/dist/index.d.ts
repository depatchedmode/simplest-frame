interface VNode {
    type: string;
    props: {
        style?: Record<string, any>;
        children?: string | VNode | VNode[];
        [prop: string]: any;
    };
}
export declare function html(templates: string | TemplateStringsArray, ...expressions: any[]): VNode;
export {};
