export default {
  ":root": {
    items: [
      {
        title: "标题",
        type: "text",
        value: {
          get({data}) {
            return data.content;
          },
          set({data}, value) {
            data.content = value;
          }
        },
        binding: {
          with: 'data.content',
          schema: {
            type: 'string'
          }
        }
      },
      {
        title: "选择活动来源",
        type: "select",
        value: {
          get({data}) {
            return data.content;
          },
          set({data}, value) {
            data.content = value;
          }
        },
        binding: {
          with: 'data.content',
          schema: {
            type: 'string'
          }
        }
      },
      {
        title: "单击",
        type: "_Event",
        options: {
          outputId: "click",
        },
      },
    ],
  }
};
