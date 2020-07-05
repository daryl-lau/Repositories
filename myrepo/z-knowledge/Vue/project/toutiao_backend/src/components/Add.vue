<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="40">
        <el-col :span="20">
          <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
        </el-col>
        <el-col :span="4">
          <el-button size="small" type="warning">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-steps :active="active - 1" finish-status="success" style="margin:25px 0" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="3">
          <el-tabs
            :tab-position="'left'"
            :value="active"
            @tab-click="clickHandle"
            :before-leave="beforeBaseInfoLeave"
          >
            <el-tab-pane label="基本信息" name="1" :disabled="active >= 1 ? false:true">
              <el-form
                :model="baseInfoForm"
                :rules="baseInfoRules"
                ref="baseInfoForm"
                label-width="100px"
              >
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="baseInfoForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input v-model.number="baseInfoForm.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input v-model.number="baseInfoForm.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input v-model.number="baseInfoForm.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                  <el-cascader
                    v-model="baseInfoForm.goods_cat"
                    :options="options"
                    :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id', }"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="space-between">
                <div></div>
                <el-button size="mini" type="primary" @click="baseInfoNext('baseInfoForm')">下一步</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="2" :disabled="active >= 2 ? false:true">
              <el-form label-position="top">
                <el-form-item
                  :label="item.attr_name"
                  class="labelSize"
                  v-for="(item, index) in goods_params"
                  :key="item.attr_id"
                >
                  <el-checkbox-group v-model="attr_checkList[index].attr_value">
                    <el-checkbox :label="val" v-for="(val,index) in item.attr_vals" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="space-between">
                <div></div>
                <el-button size="mini" type="primary" @click="next">下一步</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="3" :disabled="active >= 3 ? false:true">
              <el-form label-position="top">
                <el-form-item
                  :label="item.attr_name"
                  class="labelSize"
                  v-for="(item, index) in goods_props_params"
                  :key="item.attr_id"
                >
                  <el-checkbox-group v-model="attr_propsList[index].attr_value">
                    <el-checkbox :label="val" v-for="(val,index) in item.attr_vals" :key="index"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="space-between">
                <div></div>
                <el-button size="mini" type="primary" @click="next">下一步</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="4" :disabled="active >= 4 ? false:true">
              <el-upload
                action="http://www.klxin.cn:8888/api/private/v1/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
                :on-success="onSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-row type="flex" justify="space-between">
                <div></div>
                <el-button size="mini" type="primary" @click="next">下一步</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="5" :disabled="active >= 5 ? false:true">
              <quill-editor v-model="goods_introduce" ref="myQuillEditor" :options="editorOption"></quill-editor>
              <el-row type="flex" justify="space-between">
                <div></div>
                <el-button size="small" type="primary" @click="submit" style="margin-top: 20px">提交</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="完成" name="7" :disabled="active >= 7 ? false:true">
              <el-row type="flex" justify="space-around">
                <i class="el-icon-success success"></i>
              </el-row>
              <el-row type="flex" justify="space-between">
                <div></div>
                <div>
                  <el-button size="mini" type="primary" @click="reAdd">继续添加</el-button>
                  <el-button size="mini" type="primary" @click="$router.push('/goods')">确定</el-button>
                </div>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getCateList, getAttributes, addGoods } from '@/api'
export default {
    data() {
        return {
            active: '1',
            baseInfoForm: {
                goods_name: '',
                goods_price: null,
                goods_weight: null,
                goods_number: null,
                goods_cat: ''
            },
            editorOption: {},
            goods_params: [],
            goods_props_params: [],
            attr_checkList: [{ attr_id: '', attr_value: [] }],
            attr_propsList: [{ attr_id: '', attr_value: [] }],
            options: [],
            pics: [],
            goods_introduce: '',
            baseInfoRules: {
                goods_name: [
                    {
                        required: true,
                        message: '商品名称不能为空！',
                        trigger: 'blur'
                    }
                ],
                goods_price: [
                    {
                        type: 'number',
                        required: true,
                        message: '商品价格只能为数字！',
                        trigger: 'blur'
                    }
                ],
                goods_weight: [
                    {
                        type: 'number',
                        required: true,
                        message: '商品重量只能为数字！',
                        trigger: 'blur'
                    }
                ],
                goods_number: [
                    {
                        type: 'number',
                        required: true,
                        message: '商品数量只能为数字！',
                        trigger: 'blur'
                    }
                ],
                goods_cat: [
                    {
                        required: true,
                        message: '商品分类不能为空！',
                        trigger: 'change'
                    },
                    {
                        type: 'array',
                        min: 3,
                        max: 3,
                        message: '只能选择三级分类！',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    methods: {
        clickHandle(tab) {
            this.active = tab.name
        },
        baseInfoNext(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.active = String(Number(this.active) + 1)
                } else {
                    return false
                }
            })
        },
        next() {
            this.active = String(Number(this.active) + 1)
        },
        reAdd() {
            this.baseInfoForm.goods_name = ''
            this.baseInfoForm.goods_price = null
            this.baseInfoForm.goods_weight = null
            this.baseInfoForm.goods_number = null
            this.baseInfoForm.goods_cat = ''
            this.active = '1'
        },
        async init() {
            const { data } = await getCateList()
            if (data.data) {
                this.options = data.data
            }
        },
        async handleChange() {
            const { data } = await getAttributes(
                this.baseInfoForm.goods_cat[2],
                'many'
            )
            const { data: res } = await getAttributes(
                this.baseInfoForm.goods_cat[2],
                'only'
            )
            if (data.data) {
                this.attr_checkList = []
                data.data.forEach(item => {
                    if (!item.attr_vals) {
                        item.attr_vals = []
                    } else {
                        item.attr_vals = item.attr_vals.trim().split(',')
                    }
                    this.attr_checkList.push({
                        attr_id: item.attr_id,
                        attr_value: []
                    })
                })
                this.goods_params = data.data
            }

            if (res.data) {
                this.attr_propsList = []
                res.data.forEach(item => {
                    if (!item.attr_vals) {
                        item.attr_vals = []
                    } else {
                        item.attr_vals = item.attr_vals.trim().split(',')
                    }
                    this.attr_propsList.push({
                        attr_id: item.attr_id,
                        attr_value: []
                    })
                })
                this.goods_props_params = res.data
            }
        },
        beforeBaseInfoLeave(activeName, oldActiveName) {
            if (activeName == 2 && oldActiveName == 1) {
            }

            if (activeName == 3) {
            }
        },
        handlePictureCardPreview() {},
        handleRemove(file, fileList) {
            console.log(file)
            console.log(fileList)
            let img = file.response.data.tmp_path
            let index = this.pics.findIndex(i => i.pic == img)
            this.pics.splice(index, 1)
        },
        onSuccess(res, file, fileList) {
            console.log(res)
            console.log(file)
            console.log(fileList)
            this.pics.push({ pic: res.data.tmp_path })
        },
        async submit() {
            let baseData = this._.cloneDeep(this.baseInfoForm)
            baseData.goods_cat = baseData.goods_cat.join(',')
            let attrs = []
            this.attr_checkList.forEach(item => {
                if (item.attr_value.length > 0) {
                    attrs.push({
                        attr_id: item.attr_id,
                        attr_value: item.attr_value.join(',')
                    })
                }
            })
            this.attr_propsList.forEach(item => {
                if (item.attr_value.length > 0) {
                    attrs.push({
                        attr_id: item.attr_id,
                        attr_value: item.attr_value.join(',')
                    })
                }
            })
            let requestData = {
                ...baseData,
                attrs,
                pics: this.pics,
                goods_introduce: this.goods_introduce
            }

            // if (this.goods_introduce) {
            //     Object.assign(requestData, {
            //         goods_introduce: this.goods_introduce
            //     })
            // }

            // if (attrs.length > 0) {
            //     Object.assign(requestData, { attrs })
            // }

            // if (this.pics.length > 0) {
            //     Object.assign(requestData, { pics: this.pics })
            // }

            console.log(requestData)
            const { data } = await addGoods(requestData)

            console.log(data)
            if (data.meta.status == 201) {
                this.$message.success('添加商品成功！')
                this.active = '7'
            } else {
                this.$message.error(`${data.meta.msg}，请检查参数！`)
            }
        }
    },
    created() {
        this.init()
    },
    computed: {
        headers() {
            return { Authorization: localStorage.getItem('token') }
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-step__title {
    font-size: 14px;
}

.labelSize {
    /deep/ .el-form-item__label {
        font-size: 18px;
    }
}

.el-tab-pane {
    margin-left: 20px;
}

/deep/ .ql-editor {
    min-height: 300px;
}

.success {
    font-size: 100px;
    color: lightgreen;
}
</style>