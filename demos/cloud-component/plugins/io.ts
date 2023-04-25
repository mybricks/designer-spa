
export default function () {
  return {
    name: '@mybricks/cloud-component-toplView-io',
    title: '逻辑视图拓展',
    author: 'ZuoZhe',
    ['author.zh']: '作者',
    version: '1.0.0',
    contributes: {
      toplView: {
        globalIO: {
          configs: {
            addInput: {
              title: '新建编辑项',
              type: 'config',
              schema: { type: 'string' },
              values: {
                edtType: 'text',
                defaultValue: '',
                description: ''
              },
              editors: [
                {
                  title: '编辑项类型',
                  type: 'select',
                  options: [
                    { label: '字符', value: 'text' },
                    { label: '开关', value: 'switch' }
                  ],
                  value: {
                    get({ values }) {
                      return values['edtType'];
                    },
                    set({ values }, edtType) {
                      values['edtType'] = edtType;

                      switch (edtType) {
                        case 'text':
                          values['defaultValue'] = '';
                          break;
                        case 'switch':
                          values['defaultValue'] = false;
                          break;
                        default:
                          break;
                      }
                    }
                  }
                },
                {
                  title: '描述',
                  type: 'text',
                  value: {
                    get({ values }) {
                      return values['description'];
                    },
                    set({ values }, description) {
                      values['description'] = description;
                    }
                  }
                },
                {
                  title: '默认值',
                  type: 'text',
                  ifVisible({ values }) {
                    return values['edtType'] === 'text';
                  },
                  value: {
                    get({ values }) {
                      return values['defaultValue'];
                    },
                    set({ values }, defaultValue) {
                      values['defaultValue'] = defaultValue;
                    }
                  }
                },
                {
                  title: '默认值',
                  type: 'switch',
                  ifVisible({ values }) {
                    return values['edtType'] === 'switch';
                  },
                  value: {
                    get({ values }) {
                      return values['defaultValue'];
                    },
                    set({ values }, defaultValue) {
                      values['defaultValue'] = defaultValue;
                    }
                  }
                },
              ]
            }
          }
        }
      }
    }
  };
}
