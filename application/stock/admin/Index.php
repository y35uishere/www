<?php
namespace app\stock\admin;

use app\admin\controller\Admin;
use app\common\builder\ZBuilder;
use app\stock\model\StockList;
use Curl\Curl;
use think\Db;
use think\Exception;
use think\Session;

class Index extends Admin
{
    public function index()
    {
        $map = $this->getMap();
        // 获取排序
        $order = $this->getOrder();
        // 读取数据
        $data_list = Db::name('stock_list')->where($map)->order($order)->paginate($listRows = 50);
        // 分页数据
        $page = $data_list->render();
        // 自定义按钮
        $btn_sync = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '新增股票',
            'href'  => url('syncStocks'),
        ];
        $btn_update_stock_title = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '更新股票信息',
            'href'  => url('updateStockTitle'),
        ];
        $btn_all_low = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '设全部股票为可买',
            'href'  => url('all_low'),
        ];
        $btn_risk_alls = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '设ST*ST为禁买',
            'href'  => url('risk_alls'),
        ];
        $btn_cy_alls = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '设创业板为禁买',
            'href'  => url('cy_alls'),
        ];
        $btn_jijin_alls = [
            'class' => 'btn btn-success',
            'icon'  => 'fa fa-fw fa-key',
            'title' => '设基金债券为禁买',
            'href'  => url('jijin_alls'),
        ];
        // 使用ZBuilder快速创建数据表格
        return ZBuilder::make('table')
            ->setPageTitle('股票管理') // 设置页面标题
            ->setTableName('stock_list') // 设置数据表名
            ->addOrder('title,code,pinyin') // 添加排序
            ->addFilter('code') // 添加筛选
            ->setSearch(['code' => '代码', 'title' => '股票名', 'pinyin' => '简拼']) // 设置搜索参数
            ->addTopButton('custom', $btn_sync, true) // 添加顶部按钮
            ->addTopButton('custom', $btn_update_stock_title, true) // 添加顶部按钮
            ->addTopButton('custom', $btn_all_low) // 添加顶部按钮
            ->addTopButton('custom', $btn_risk_alls) // 添加顶部按钮
            ->addTopButton('custom', $btn_cy_alls) // 添加顶部按钮
            ->addTopButton('custom', $btn_jijin_alls) // 添加顶部按钮
            ->addRightButton('enable', ['table' => 'stock_list']) // 启用
            ->addRightButton('disable', ['table' => 'stock_list']) // 禁用
            ->addRightButton('edit') // 添加编辑按钮
            ->addRightButton('delete') // 添加编辑按钮
            ->addColumns([ // 批量添加列
                ['title', '股票名'],
                ['code', '股票代码'],
                ['pinyin', '股票缩写'],
                ['add_time', '添加时间', 'datetime'],
                ['quota', '购买总限额(元)'],
                ['status', '状态', 'status', '', ['禁用:danger', '启用:success']],
                ['right_button', '操作', 'btn'],
            ])
            ->setRowList($data_list) // 设置表格数据
            ->setPages($page) // 设置分页数据
            ->fetch();
    }
    public function edit($id = null)
    {

        if ($id === null) {
            $this->error('缺少参数');
        }

        // 获取数据
        $info = Db::name('stock_list')->where('id', $id)->field('*', false)->find();
        if ($this->request->isPost()) {
            $data          = $this->request->post();
            $data['quota'] = abs($data['quota']);
            if (StockList::update($data)) {
                $this->success('编辑成功', "index");
            } else {
                $this->error('编辑失败');
            }
        }

        // 使用ZBuilder快速创建表单
        return ZBuilder::make('form')
            ->setPageTitle('编辑') // 设置页面标题
            ->addFormItems([ // 批量添加表单项
                ['hidden', 'id'],
                ['static:6', 'title', '股票名', '股票名'],
                ['static:6', 'code', '代码', '股票代码'],
                ['static:6', 'pinyin', '拼音', '股票名简拼'],
                ['text:3', 'quota', '限额', '平台单支股票购买限额，0为不限制，其余数字为限制额'],
                ['radio', 'status', '状态', '', ['禁用', '启用']],
            ])
            ->setFormData($info) // 设置表单数据
            ->fetch();
    }
    public function delete($record = [])
    {
        return parent::delete($record); // TODO: Change the autogenerated stub
    }

    //更新深圳主板数据
    public function sz_all()
    {
        $req   = request();
        $star  = $req::instance()->param('last');
        $last  = $star + 8;
        $model = Db::name('stock_list');
        $arr   = array();
        for ($i = $star; $i <= $last; $i++) {
            //更新深圳主板股票
            $t   = substr("00000" . $i, -6, 6);
            $tmd = $model->where("code=$t")->find();
            $dat = sohu_keyword($t);
            if (count($dat[0]) >= 3) {
                $data = $this->each($dat[0]);
                if (empty($tmd)) {
                    $model->data($data)->insert();
                } else {
                    $model->where(['code' => $data['code']])->data($data)->update();
                }
            }
            if (!empty($dat[0])) {
                $arr[$i] = $dat[0];
            };
        }
        $this->view->assign('arr', $arr);
        $this->view->assign('last', $last);
        $this->view->assign('local', http() . $_SERVER["SERVER_NAME"]);
        return $this->view->fetch();

    }
    /*
     * 设置所有st *st 为禁买
     */
    public function risk_alls()
    {
        $stock_list = Db::name('stock_list');
        $class_res  = $stock_list->select();
        if (!empty($class_res)) {
            foreach ($class_res as $key => $v) {
                if ($v['status'] == 0) {
                    continue;
                }
                if (substr($v['title'], 0, 1) == 'S' || substr($v['title'], 0, 1) == '*' || substr($v['title'], 0, 1) == 's') {
                    $map            = "id=" . $v['id'];
                    $data['status'] = 0;
                    $stock_list->where($map)->update($data);
                }
            }
        }
        $this->success('设置成功', "index", '', '1');
    }
    /*
     * 设置所有创业板为禁买
     */
    public function cy_alls()
    {
        $stock_list = Db::name('stock_list');
        $class_res  = $stock_list->select();
        if (!empty($class_res)) {
            foreach ($class_res as $key => $v) {
                if ($v['status'] == 0) {
                    continue;
                }
                if (substr($v['code'], 0, 1) == '3') {
                    $map            = "id=" . $v['id'];
                    $data['status'] = 0;
                    $stock_list->where($map)->update($data);
                }
            }
        }
        $this->success('设置成功', "index", '', '1');
    }
    /*
     * 设置所有基金债券为禁买
     */
    public function jijin_alls()
    {
        $stock_list = Db::name('stock_list');
        $class_res  = $stock_list->select();
        if (!empty($class_res)) {
            foreach ($class_res as $key => $v) {
                if ($v['status'] == 0) {
                    continue;
                }
                if (strlen($v['pinyin']) > 4) {
                    $map            = "id=" . $v['id'];
                    $data['status'] = 0;
                    $stock_list->where($map)->update($data);
                }
            }
        }
        $this->success('设置成功', "index", '', '1');
    }
    /*
     *设置所有st *st 为可买
     */
    public function riskall_low()
    {
        $stock_list = Db::name('stock_list');
        $class_res  = $stock_list->select();
        if (!empty($class_res)) {
            foreach ($class_res as $key => $v) {
                if ($v['status'] == 1) {
                    continue;
                }
                if (substr($v['title'], 0, 1) == 'S' || substr($v['title'], 0, 1) == '*' || substr($v['title'], 0, 1) == 's') {
                    $map            = "id=" . $v['id'];
                    $data['status'] = 1;
                    $stock_list->where($map)->update($data);
                }
            }
        }
        $this->success('设置成功', "index", '', '1');
    }
    /*
     * 设置所有股票为可买
     */
    public function all_low()
    {
        $stock_list = Db::name('stock_list');
        $class_res  = $stock_list->select();
        if (!empty($class_res)) {
            foreach ($class_res as $key => $v) {
                if ($v['status'] == 1) {
                    continue;
                }
                $map            = "id=" . $v['id'];
                $data['status'] = 1;
                $stock_list->where($map)->update($data);
            }
        }
        $this->success('设置成功', "index", '', '1');
    }

    /**
     * 同步股票列表，增加新股票用
     * @throws \think\exception\DbException
     */
    public function syncStocks()
    {
        $newStocks      = $this->getStockList();
        $stockListModel = new StockList;

        $stocks      = [];
        $savedStocks = $stockListModel->all();
        foreach ($savedStocks as $v) {
            $stocks[] = $v->toArray();
        }
        $unSaveStocks = filterNotExistChildren($stocks, $newStocks, 'code');
        foreach ($unSaveStocks as $unSaveStock) {
            try {
                $res = $stockListModel->insert($unSaveStock);
            } catch (\Throwable $th) {

            }
        }

        return "<div style='font-size: 20px;line-height: 120px;text-align: center;color:#4DC67B'>更新完成，请刷新浏览器</div>";
    }

    /**
     * 更新现有股票名称
     * @throws \Exception
     */
    public function updateStockTitle()
    {
        $newStocks      = $this->getStockList();
        $stockListModel = new StockList;
        $stocks         = [];

        $savedStocks = $stockListModel->all();
        foreach ($savedStocks as $v) {
            $stocks[] = $v->toArray();
        }
        $needUpdate = $this->filterTitileChangedChildren($stocks, $newStocks);
        $stockListModel->isUpdate(true)->saveAll($needUpdate);

        return "<div style='font-size: 20px;line-height: 120px;text-align: center;color:#4DC67B'>更新完成，请刷新浏览器</div>";
    }
    private function filterTitileChangedChildren($stocks, $newStocks)
    {
        $needUpdate = [];
        foreach ($stocks as $stock) {
            foreach ($newStocks as $item) {
                if ($item['code'] == $stock['code'] && $item['title'] !== $stock['title']) {
                    $stock['title'] = $item['title'];
                    $needUpdate[]   = $stock;
                }
            }
        }
        return $needUpdate;
    }
    /**
     * 获取最新全部股票列表
     * @param string $flag 沪深标识  SH:上证 SZ:深证
     * @return array 股票数组
     * @throws \Exception 获取数据异常
     */

    private function getStockList($flag = null)
    {
        $curl = new Curl();
        $curl->post('http://api.tushare.pro', '{"api_name":"stock_basic","token":"112f9586927636f80f1b5a8b94a5b0d1633b8d194e590c24341ff7b7","params":{}}');
        $response = json_decode($curl->response, true);
        if ($response['code'] !== 0) {
            throw new Exception($response['msg']);
        }

        if (empty($flag)) {
            $stocks = $response['data']['items'];
        } else {
            $stocks = array_filter($response['data']['items'], function ($item) use ($flag) {
                return strpos($item[0], $flag) !== false;
            });
        }
        return array_map(function ($item) use ($flag) {
            return [
                'type'        => explode('.', $item[0])[1],
                'title'       => $item[2],
                'code'        => $item[1],
                'pinyin'      => getPinYin($item[2]),
                'add_time'    => time(),
                'target_uid'  => 1,
                'target_name' => 'system',
            ];
        }, $stocks);
    }

    //接收数据
    public function each($arr)
    {
        $data['title']       = $arr['name'];
        $data['code']        = $arr['code'];
        $data['status']      = 1;
        $data['pinyin']      = $arr['pin'];
        $data['add_time']    = time();
        $data['target_uid']  = UID;
        $data['target_name'] = Session::get("user_auth")['username'];
        return $data;
    }

}
