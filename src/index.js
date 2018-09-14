import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import styled from 'styled-components'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'

import './theme/globalStyle'

import { Header } from './components/Header'
import { PageTitle } from './components/PageTitle'
import { FormSelector } from './components/FormSelector'
import { ToolBar } from './components/ToolBar'
import { SearchBox } from './components/SearchBox'
import { Button } from './components/Button'
import { BoxListUnit } from './components/BoxListUnit'
import BacktoTop from './components/BacktoTop'
import { JumptoPC } from './components/JumptoPC'
import { Avatar } from './components/Avatar'

// library.add(fas)

/************ フォーム受信箱 ************/
const BoxList = (props) => {
  let showData = props.showdata
  let toggledisplay = true
  return (
    <ul>
      {props.tasks.map((task, index) => {
        if (index >= showData)
          toggledisplay = false
        return (
          <BoxListUnit
            key={task.id}
            title={task.title}
            contents={task.contents}
            email={task.email}
            date={task.date}
            res={task.res}
            comments={task.comments}
            status={task.status}
            priority={task.priority}
            staff={task.staff}
            id={task.id}
            display={toggledisplay ? 'block' : 'none'}
          />
        )
      }
      )}
    </ul>
  )
}

class Box extends Component {
  state = {
    showingData: 5
  }

  showMoreData = () => {
    this.setState(state => ({
      showingData: state.showingData + 5
    }))
    console.log('showingData: ' + this.state.showingData)
  }

  render() {
    let showMoreBtn = true
    if (this.state.showingData > this.props.tasks.length) {
      showMoreBtn = false
    }
    return (
      <section>
        <Header />
        <PageTitle txt='フォーム受信箱' />
        <FormSelector forms={this.props.tasks} />
        <SearchBox />
        <ToolBar margin>
          <a href="/filter">
            <Button txt='条件変更' />
          </a>
        </ToolBar>
        <BoxList tasks={this.props.tasks} showdata={this.state.showingData} />
        { showMoreBtn && (
          <ToolBar margin>
            <Button txt='もっと見る' btnwidth='100%' func={this.showMoreData} />
          </ToolBar>
        )}
        <BacktoTop />
        <JumptoPC />
      </section>
    )
  }
}

/************ タスク詳細 ************/
const StyledTaskHead = styled.div`
  border-bottom: 1px dashed #000;
  margin-bottom: 10px;
`
const StyledTaskIdDate = styled.p`
  font-size: 12px;
`
const StyledSender = styled.div`
  display: flex;
`
const StyledMsgItems = styled.dl`
  margin: 4px 0;
  dt {
    font-size: 12px;
    color: #666;
    font-weight: bold;
  }
`
const StyledTaskDetail = styled.div`
  padding: 0 5px;
  border-bottom: 1px solid #000;
`
const StyledReplyArea = styled.ul`
  margin: 5px;
`

const ReplyArea = (props) => {
  return (
    props.tasks.map((task, index) => {
      if ((task.id == props.currentid) && task.replylist)
        return (
          task.replylist.map((reply, index) => (
            <StyledReplyArea>
              <li>
                <StyledSender>
                  <Avatar size='20px' />
                  <span>{reply.sender}</span>
                </StyledSender>
              </li>
              <li>
                <StyledTaskIdDate>{reply.date}</StyledTaskIdDate>
              </li>
              <li>{reply.comment}</li>
            </StyledReplyArea>
          ))
        )
    })
  )
}

const TaskDetail = (props) => {
  return (
    props.tasks.map((task, index) => {
      if (task.id == props.currentid)
        return (
          <StyledTaskDetail key={index}>
            <StyledTaskHead>
              <p>{task.title}</p>
              <StyledTaskIdDate>管理No.{task.id} {task.date}</StyledTaskIdDate>
            </StyledTaskHead>
            <StyledSender>
              <Avatar size='20px' />
              <span>お客様</span>
            </StyledSender>
            <StyledMsgItems>
              <dt>メールアドレス</dt>
              <dd>{task.email}</dd>
            </StyledMsgItems>
            <StyledMsgItems>
              <dt>お問い合わせ内容</dt>
              <dd>{task.contents}</dd>
            </StyledMsgItems>
          </StyledTaskDetail>
        )
    })
  )
}

const Task = (props) => {
  return (
    <section>
      <Header />
      <PageTitle txt='タスク詳細' link='/' />
      <TaskDetail tasks={props.tasks} currentid={props.match.params.id} />
      {/*
      <ToolBar border margin>
        <Button txt='件のやりとりを表示' />
      </ToolBar>
      */}
      <ReplyArea tasks={props.tasks} currentid={props.match.params.id} />
      <ToolBar>
      <Link to={`${props.match.url}/taskreply`}>
        <Button txt='返信する' />
      </Link>
      </ToolBar>
      <ToolBar>
        <Link to={`${props.match.url}/arrangetask`}>
          <Button txt='その他の操作' />
        </Link>
      </ToolBar>
      <BacktoTop />
      <JumptoPC />
    </section>
  )
}

/************ タスク詳細：お客様への返信 ************/
const StyledTextArea = styled.div`
  padding: 5px;
  textarea {
    width: 100%;
}
`
const TaskReply = (props) => {
  return (
    <section>
      <Header />
      <PageTitle txt='お客様への返信' link={`/task/${props.match.params.id}`} />
      <ToolBar border margin>
        <Link to={`/task/${props.match.params.id}/selecttemplates`}>
          <Button txt='返信テンプレートを追加' />
        </Link>
      </ToolBar>
      <StyledTextArea>

        <textarea id='replyarea' name='reply' cols='3' placeholder='返信内容を記載してください。' rows='5'>
        </textarea>
      </StyledTextArea>
      <ToolBar>
        <Button txt='下書きとして保存' />
      </ToolBar>
      <ToolBar>
        <Button txt='メモ・コメントとして保存' />
      </ToolBar>
      <ToolBar>
        <Button txt='送信' />
      </ToolBar>
      <ToolBar>
        <Button txt='削除' />
      </ToolBar>
      <ToolBar>
        <Link to={`/task/${props.match.params.id}`}>
          <Button txt='保存せずに戻る' />
        </Link>
      </ToolBar>

      <BacktoTop />
      <JumptoPC />
    </section>
  )
}

/************ フォーム受信箱：条件変更 ************/
/************ タスク詳細：その他の変更 ************/
/************ タスク詳細：お客様への返信：テンプレート選択 ************/
const StyledSectionTitle = styled.h3`
  margin: 0;
  padding: 5px;
  background-color: #333;
  color: #fff;
  border: 1px solid #ccc;
  border-left-width: 0;
  border-right-width: 0;
`
const StyledFieldSet = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  label {
    display: inline-block;
    padding: 10px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    input {
      margin-right: 4px;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
`
const FilterForms = (props) => {
  return (
    <section>
      <Header />
      <PageTitle txt='条件変更' link='/' />

      <StyledSectionTitle>絞り込み</StyledSectionTitle>
      <StyledFieldSet action="">
        {props.filter_items.map((item, index) => {
          return (
            <label htmlFor={item.id} key={index}>
              <input type="radio" id={item.id} name="filter" />
              {item.label}
            </label>
          )
        })}
      </StyledFieldSet>
      <StyledSectionTitle>並び替え</StyledSectionTitle>
      <StyledFieldSet action="">
        {props.sort_methods.map((method, index) => {
          return (
            <label htmlFor={method.id} key={index}>
              <input type="radio" id={method.id} name="sort" />
              {method.label}
            </label>
          )
        })}
      </StyledFieldSet>

      <ToolBar>
        <a href="/">
          <Button txt='キャンセル' />
        </a>
        <Button txt='反映する' />
      </ToolBar>
    </section>
  )
}

const ArrangeTask = (props) => {
  return (
    <section>
      <Header />
      <PageTitle txt='その他の操作' link={`/task/${props.match.params.id}`} />

      <StyledSectionTitle>担当者割り当て</StyledSectionTitle>
      <StyledFieldSet action="">
      <label htmlFor="0">
        <input type="radio" id="0" name="staff" />
        なし
      </label>
        {props.staff.map((item, index) => {
          return (
            <label htmlFor={item.id} key={index}>
              <input type="radio" id={item.id} name="staff" />
              {item.name}
            </label>
          )
        })}
      </StyledFieldSet>

      <StyledSectionTitle>ステータス</StyledSectionTitle>
      <StyledFieldSet action="">
        {props.filter_items.map((item, index) => {
          return (
            <label htmlFor={item.id} key={index}>
              <input type="radio" id={item.id} name="status" />
              {item.label}
            </label>
          )
        })}
      </StyledFieldSet>

      <StyledSectionTitle>優先度</StyledSectionTitle>
      <StyledFieldSet action="">
        {props.priorities.map((item, index) => {
          return (
            <label htmlFor={item.level} key={index}>
              <input type="radio" id={item.level} name="priority" />
              {item.label}
            </label>
          )
        })}
      </StyledFieldSet>

      <ToolBar>
        <Link to={`/task/${props.match.params.id}`}>
          <Button txt='キャンセル' />
        </Link>
        <Button txt='反映する' />
      </ToolBar>
    </section>
  )
}

const SelectTemplates = (props) => {
  return (
    <section>
      <Header />
      <PageTitle txt='返信テンプレート選択' link={`/task/${props.match.params.id}/taskreply`} />

      <StyledFieldSet action="">
        {props.reply_templates.map((item, index) => {
          return (
            <label htmlFor={item.id} key={index}>
              <input type="radio" id={item.id} name="reply_templates" />
              {item.name}
            </label>
          )
        })}
      </StyledFieldSet>

      <ToolBar>
        <Link to={`/task/${props.match.params.id}/taskreply`}>
          <Button txt='キャンセル' />
        </Link>
        <Button txt='反映する' />
      </ToolBar>
    </section>
  )
}

/************ コンテナ ************/
class Container extends Component {
  state = {
    staff: [
      {
        id: 1,
        name: 'Matsui'
      },
      {
        id: 2,
        name: 'Suzuki'
      },
      {
        id: 3,
        name: 'Muramatsu'
      },
      {
        id: 4,
        name: 'Tomita'
      }
    ],
    priorities: [
      {
        level: 0,
        label: 'なし'
      },
      {
        level: 1,
        label: '低'
      },
      {
        level: 2,
        label: '普通'
      },
      {
        level: 3,
        label: '高'
      },
      {
        level: 4,
        label: '緊急'
      }
    ],
    filter_items: [
      {
        id: 'new',
        label: '新着'
      },
      {
        id: 'notworking',
        label: '未対応'
      },
      {
        id: 'working',
        label: '対応中'
      },
      {
        id: 'pending',
        label: '保留中'
      },
      {
        id: 'solved',
        label: '解決済み'
      }
    ],
    sort_methods: [
      {
        id: 'date_descending',
        label: '受付日 新しい順'
      },
      {
        id: 'date_ascending',
        label: '受付日 古い順'
      },
      {
        id: 'priority_descending',
        label: '優先度 新しい順'
      },
      {
        id: 'priority_ascending',
        label: '優先度 古い順'
      }
    ],
    reply_templates: [
      {
        id: 1,
        name: '通常テンプレート',
        content: 'お問い合わせありがとうございます。よろしくお願いいたします。'
      },
      {
        id: 2,
        name: '調査中テンプレート',
        content: 'お問い合わせありがとうございます。お問い合わせの件につきましてただいま調査中です。'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'ふつうのフォーム',
        contents: 'いつも朝もしその観念ように対してのの中を会っないです。もっとも前に講演ようはむしろこの一致ないますまでを傾けるでならませには運動通じますましが、ずいぶんには儲けたたますな。校長に思わたのもできるだけ次第をどうもなけれでたい。',
        email: 'user@user.com',
        date: '2018/10/10',
        res: 0,
        comments: 0,
        status: '未読',
        priority: '普通',
        staff: 'Matsui',
        replylist: [
          {
            sender: 'Matsui',
            date: '2018/10/11',
            comment: 'とにかく何ともらくとあるですといただくないのが間違っなくっます。'
          }
        ]
      },
      {
        id: 2,
        title: 'たのしいフォーム',
        contents: '近頃ネルソンさんを養成国家たった妨害が思わです貧乏人その腰あなたか病気からって今反対なかっんますたば、その昔はいつか文学教授に聞いと、久原さんのものから慚愧の私に無論今誤認と書いから私子分がおお出かけであるようにどうしてもご忠告がしたませが、とにかく何ともらくとあるですといただくないのが間違っなくっます。だからそれでもご火事が行か事はちょっと不愉快としでしょて、その賞でも喰わたてというらに向けしおりましなら。',
        email: 'tanosi@user.com',
        date: '2018/10/18',
        res: 0,
        comments: 0,
        status: '未読',
        priority: '普通',
        staff: ''
      },
      {
        id: 3,
        title: 'りんごフォーム',
        contents: 'そうしたところ科学の時この人間はそれ中にあるありかと岡田さんが渡っました、自力の絶対ありというお命令んたらますて、',
        email: 'apple@user.com',
        date: '2018/9/20',
        res: 0,
        comments: 0,
        status: '保留中',
        priority: '低',
        staff: 'Muramatsu'
      },
      {
        id: 4,
        title: 'おやつフォーム',
        contents: '主義の所が自己に今までの人と将来怒らているで、実際のほかをしてこの上にしばしば講じますたと行きないのんて、古いたましてそうご外国思いじものたですだ。また弟か意外か説明を発したて、一番末権力を考えているん以上に肝講義の先刻を含まらしくた。毎日をはもしいうで存じたありなけれうて、さぞすでに講じと使用は全くないう方る。',
        email: 'oyatsu@user.com',
        date: '2018/8/22',
        res: 0,
        comments: 0,
        status: '解決済',
        priority: '高',
        staff: 'Tomita'
      },
      {
        id: 5,
        title: 'たのしいフォーム',
        contents: 'ところがとてもばかましだという一疋たう。生意気たんんたもましすると曲の気の毒手のところにはそんなに生たたいと、あなたまで猫をひけれんましで。こすりすぎみんなは扉にないたて明方のゴーシュのゴーシュ家を指さし第万こどもげの病気を出すてはじめだです。扉はいつかとっからいない。',
        email: 'sakana@umi.com',
        date: '2018/8/19',
        res: 0,
        comments: 0,
        status: '保留中',
        priority: '緊急',
        staff: 'Muramatsu'
      },
      {
        id: 6,
        title: 'ふつうのフォーム',
        contents: 'からだも裏処たり何を出とまわっだ。汗は音が思わずになってのどに楽器のようをあるて顔をつかて何だか虎をできるてくださいん。いちばんぼうっと舞台が弓がすわりますたろ。そこずいぶんに舌ではせがゴーシュからしたた。バケツを見たまし。',
        email: 'ninjin@yasai.com',
        date: '2018/8/12',
        res: 0,
        comments: 0,
        status: '解決済',
        priority: '低い',
        staff: 'Tomita'
      },
      {
        id: 7,
        title: 'たのしいフォーム',
        contents: 'にわかに運搬いただけながら、ありが持たているたらて顔つきをすると頭をしいんと時あいたた。「大いいない。',
        email: 'suika@fruits.com',
        date: '2018/7/30',
        res: 0,
        comments: 0,
        status: '対応中',
        priority: '高',
        staff: 'Matsui'
      }
    ]
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact
            path='/'
            render={(props) => <Box {...props} tasks={this.state.tasks} />}
          />
          <Route
            path='/filter'
            render={(props) => <FilterForms {...props} filter_items={this.state.filter_items} sort_methods={this.state.sort_methods} />}
          />
          <Route
            path='/task/:id/arrangetask'
            render={(props) => <ArrangeTask {...props} tasks={this.state.tasks} staff={this.state.staff} priorities={this.state.priorities} filter_items={this.state.filter_items} />}
          />
          <Route
            path='/task/:id/taskreply'
            render={(props) => <TaskReply {...props} tasks={this.state.tasks} />}
          />
          <Route
            path='/task/:id/selecttemplates'
            render={(props) => <SelectTemplates {...props} reply_templates={this.state.reply_templates} />}
          />
          <Route
            path='/task/:id'
            render={(props) => <Task {...props} tasks={this.state.tasks} />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Container />, document.getElementById('root'))
