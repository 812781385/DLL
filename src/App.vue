<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'app'
}
</script>

<style lang="scss">
    html, body {
        margin:0;
        padding: 0;
    }
    ul,li {
        list-style: none;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0px;
        padding: 0;
        height: 100%;
        /*功能区*/
        .gongneng {
            overflow: hidden;
            margin-bottom: 20px;
            .el-input {
                width: 225px;
                float: left;
            }
            .gongneng-right {
                float: right;
            }
        }
    }
    /*表格该行处于什么状态的颜色*/
    .danger-row {
        background-color: #fdaaaa!important;
        .text-color{
            color:#FF6443;
        }
    }
    .warning-row {
        .text-color{
            color:#FDB61B;
        }
    }
    .hint-row {
        .text-color{
            color:#ECD994;
        }
    }

    /* 对话框 */
    .el-dialog {
        width: 450px!important;
    }
</style>
