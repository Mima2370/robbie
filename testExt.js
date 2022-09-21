{
  "collapsed": true,
  "extID": "testExt",
  "extName": "Test",
  "color1Pick": false,
  "color2Pick": false,
  "color1": "#0FBD8C",
  "color2": "#0DA57A",
  "indexJS": "\n// create by scratch3-extension generator\nconst ArgumentType = Scratch.ArgumentType;\nconst BlockType = Scratch.BlockType;\nconst formatMessage = Scratch.formatMessage;\nconst log = Scratch.log;\n\nconst menuIconURI = null;\nconst blockIconURI = null;\n\nclass testExt{\n  constructor (runtime){\n    this.runtime = runtime;\n    // communication related\n    this.comm = runtime.ioDevices.comm;\n    this.session = null;\n    this.runtime.registerPeripheralExtension('testExt', this);\n    // session callbacks\n    this.reporter = null;\n    this.onmessage = this.onmessage.bind(this);\n    this.onclose = this.onclose.bind(this);\n    this.write = this.write.bind(this);\n    // string op\n    this.decoder = new TextDecoder();\n    this.lineBuffer = '';\n  }\n\n  onclose (){\n    this.session = null;\n  }\n\n  write (data, parser = null){\n    if (this.session){\n      return new Promise(resolve => {\n        if (parser){\n          this.reporter = {\n            parser,\n            resolve\n          }\n        }\n        this.session.write(data);\n      })\n    }\n  }\n\n  onmessage (data){\n    const dataStr = this.decoder.decode(data);\n    this.lineBuffer += dataStr;\n    if (this.lineBuffer.indexOf('\\n') !== -1){\n      const lines = this.lineBuffer.split('\\n');\n      this.lineBuffer = lines.pop();\n      for (const l of lines){\n        if (this.reporter){\n          const {parser, resolve} = this.reporter;\n          resolve(parser(l));\n        };\n      }\n    }\n  }\n\n  scan (){\n    this.comm.getDeviceList().then(result => {\n        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);\n    });\n  }\n\n  getInfo (){\n    return {\n      id: 'testExt',\n      name: 'Test',\n      color1: '#0FBD8C',\n      color2: '#0DA57A',\n      menuIconURI: menuIconURI,\n      blockIconURI: blockIconURI,\n      blocks: [\n        {\n          opcode: 'fetch',\n          blockType: BlockType.REPORTER,\n          arguments: {\n            link: {\n              type: ArgumentType.STRING\n            }\n          },\n          text: 'fetch [link]'\n        }\n      ]\n    }\n  }\n\nfetch (args, util){\n  const link = args.link;\n  data = fetch(link)\n  return this.write(data);\n}\n\n}\n\nmodule.exports = testExt;\n",
  "menuIcon": null,
  "blockIcon": null,
  "editBlockID": "fetch",
  "blocks": [
    {
      "opcode": "fetch",
      "svg": "<svg id=\"src\" xmlns=\"http://www.w3.org/2000/svg\" width=\"126.69999694824219\" height=\"40\" >\n    %3Cg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20data-id%3D%22%7DiLa%3BK%3F%5D%25pC%2Byr)WD%7Cw*%22%20class%3D%22blocklyDraggable%20blocklySelected%22%20data-shapes%3D%22reporter%20round%22%3E%3Cpath%20class%3D%22blocklyPath%20blocklyBlockBackground%22%20stroke%3D%22%23FF3355%22%20fill%3D%22%23FF6680%22%20fill-opacity%3D%221%22%20d%3D%22m%200%2C0%20m%2020%2C0%20H%20106.70000076293945%20a%2020%2020%200%200%201%200%2040%20H%2020%20a%2020%2020%200%200%201%200%20-40%20z%22%2F%3E%3Cg%20data-id%3D%2212iJvD%2CZu%2F)9%3DG1_ar%2F%2B%22%20data-argument-type%3D%22text%22%20data-shapes%3D%22argument%20round%22%20transform%3D%22translate(76.70000076293945%2C4)%22%3E%3Cpath%20class%3D%22blocklyPath%20blocklyBlockBackground%22%20stroke%3D%22%23FF3355%22%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%221%22%20d%3D%22m%200%2C0%20m%2016%2C0%20H%2030%20a%2016%2016%200%200%201%200%2032%20H%2016%20a%2016%2016%200%200%201%200%20-32%20z%22%2F%3E%3Cg%20class%3D%22blocklyEditableText%22%20style%3D%22cursor%3A%20text%3B%22%20transform%3D%22translate(8%2C%200)%20%22%3E%3Ctext%20class%3D%22blocklyText%22%20x%3D%2215%22%20y%3D%2218%22%20dominant-baseline%3D%22middle%22%20dy%3D%220%22%20text-anchor%3D%22middle%22%3Elink%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20data-argument-type%3D%22text%22%20class%3D%22blocklyEditableText%22%20style%3D%22cursor%3A%20text%3B%22%20transform%3D%22translate(12%2C%204)%20%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2256.70000076293945%22%20height%3D%2232%22%20fill%3D%22%23FF3355%22%2F%3E%3Ctext%20class%3D%22blocklyText%20blocklyEditableLabel%22%20x%3D%2228.350000381469727%22%20y%3D%2218%22%20dominant-baseline%3D%22middle%22%20dy%3D%220%22%20text-anchor%3D%22middle%22%3Efetch%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20class%3D%22blocklyPath%22%20style%3D%22visibility%3A%20hidden%22%20d%3D%22%22%20fill%3D%22%23FF3355%22%2F%3E%3C%2Fg%3E\n    </svg>",
      "msg": "fetch %1",
      "args": [
        {
          "argType": "STRING",
          "placeholder": "link",
          "shadowType": "text",
          "fieldType": "TEXT",
          "json": {
            "type": "input_value",
            "name": "link"
          }
        }
      ],
      "mutationText": "<xml><mutation xmlns=\"http://www.w3.org/1999/xhtml\" generateshadows=\"true\" proccode=\"fetch %s\" argumentids=\"[&quot;l#6vn^Dqnm/~%@[dkZ}E&quot;]\" argumentnames=\"[&quot;link&quot;]\" argumentdefaults=\"[&quot;&quot;]\" warp=\"false\"></mutation></xml>",
      "type": "output",
      "script": "fetch (args, util){\n  const link = args.link;\n  data = fetch(link)\n  return this.write(data);\n}\n"
    }
  ],
  "menus": [],
  "addBlockType": "output",
  "showMutation": false,
  "blockScript": null,
  "genOption": [],
  "genHeadScript": null,
  "blockGenerator": null,
  "isShowCodePreview": false
}
