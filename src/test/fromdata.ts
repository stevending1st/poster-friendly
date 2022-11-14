export const ymldata = `name: this is name
description: description description description description
title: 推荐嘉宾 - [姓名/花名/昵称]（栏目）
assignees:
  - steven
labels:
  - good
body:
  - type: markdown
    attributes:
      value: "## Welcome!"
  - type: input
    id: prevalence
    attributes:
      label: Bug prevalence
      description: "How often do you or others encounter this bug?"
      placeholder: "Whenever I visit the user account page (1-2 times a week)"
      value: input value
    validations:
      required: true
  - type: textarea
    id: repro
    attributes:
      label: Reproduction steps
      description: "How do you trigger this bug? Please walk us through it step by step."
      placeholder: placeholder
      value: |
        1.
        2.
        3.
        ...
      render: bash
    validations:
      required: true
  - type: dropdown
    id: download
    attributes:
      label: How did you download the software?
      description: "dropdown description"
      options:
        - Homebrew
        - MacPorts
        - apt-get
        - Built from source
      multiple: false
    validations:
      required: true
  - type: checkboxes
    id: cat-preferences
    attributes:
      label: What kinds of cats do you like?
      description: You may select more than one.
      options:
        - label: Orange cat (required. Everyone likes orange cats.)
          required: true
        - label: "**Black cat**"
        - label: 可参考 [播客录音指南](https://www.bilibili.com/video/BV1kq4y1c7Nu) 准备好录音设备与环境。`
