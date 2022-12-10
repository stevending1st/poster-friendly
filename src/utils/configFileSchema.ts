export const configFileSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    assignees: {
      $id: 'string&string_arr',
      type: 'string' || 'array',
      anyOf: [
        { type: 'string' },
        { type: 'array', contains: { type: 'string' } },
      ],
    },
    labels: { $defs: 'string&string_arr' },
    title: { type: 'string' },
    body: {
      type: 'array',
      anyOf: [
        {
          properties: {
            type: { const: 'markdown' },
            id: { type: 'string' },
            attributes: {
              properties: { value: { type: 'string' } },
              require: ['value'],
            },
            validations: {
              id: 'item_validations',
              properties: { required: { type: 'boolean' } },
              require: ['properties'],
            },
          },
          required: ['type', 'attributes'],
        },
        {
          properties: {
            type: { const: 'input' },
            id: { type: 'string' },
            attributes: {
              properties: {
                label: { type: 'string' },
                description: { type: 'string' },
                placeholder: { type: 'string' },
                value: { type: 'string' },
              },
              require: ['label'],
            },
            validations: { $ref: 'item_validations' },
          },
          required: ['type', 'attributes'],
        },
        {
          properties: {
            type: { const: 'textarea' },
            id: { type: 'string' },
            attributes: {
              properties: {
                label: { type: 'string' },
                description: { type: 'string' },
                placeholder: { type: 'string' },
                value: { type: 'string' },
                render: { type: 'string' },
              },
              require: ['label'],
            },
            validations: {
              $ref: 'item_validations',
            },
          },
          required: ['type', 'attributes'],
        },
        {
          properties: {
            type: { const: 'dropdown' },
            id: { type: 'string' },
            attributes: {
              properties: {
                label: { type: 'string' },
                description: { type: 'string' },
                options: {
                  type: 'array',
                  anyof: [{ properties: { type: 'string' } }],
                },
                multiple: { type: 'boolean' },
              },
              require: ['label', 'options'],
            },
            validations: {
              $ref: 'item_validations',
            },
          },
          required: ['type', 'attributes'],
        },
        {
          properties: {
            type: { const: 'checkboxes' },
            id: { type: 'string' },
            attributes: {
              properties: {
                label: { type: 'string' },
                description: { type: 'string' },
                options: {
                  type: 'array',
                  anyof: [
                    {
                      properties: {
                        label: 'string',
                        required: 'boolean',
                      },
                      required: ['label'],
                    },
                  ],
                },
              },
              require: ['label', 'options'],
            },
            validations: {
              $ref: 'item_validations',
            },
          },
          required: ['type', 'attributes'],
        },
      ],
    },
  },
  required: ['name', 'description'],
  additionalProperties: false,
};
