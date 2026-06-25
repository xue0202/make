/**
 * @name 快递官网首页
 */

import React, { useMemo } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    Box,
    Building2,
    ChartColumn,
    CircleHelp,
    Clock3,
    MapPinned,
    PackageCheck,
    ShieldCheck,
    Smartphone,
    Store,
    Truck,
    type LucideIcon,
} from 'lucide-react';
import { AnnotationViewer } from '@axhub/annotation';
import type {
    AnnotationDirectoryRouteNode,
    AnnotationViewerOptions,
} from '@axhub/annotation';
import { useHashPage } from '../../common/useHashPage';
import type { AnnotationSourceDocument } from '@axhub/annotation';
import annotationSourceJson from './annotation-source.json';
import './style.css';

const annotationSourceDocument = annotationSourceJson as AnnotationSourceDocument;

/* ---------- 子页面通用组件 ---------- */

function SubPageHeader({ title }: { title: string }) {
    return (
        <header className="express-header">
            <a className="express-logo" href="#page=home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="express-logo-mark" aria-hidden="true">
                    <PackageCheck size={18} />
                </div>
                <div>
                    <strong>速达快运</strong>
                    <span>Personal & Merchant Delivery</span>
                </div>
            </a>
            <nav className="express-nav" aria-label="子页面导航">
                <a className="express-nav-link" href="#page=home">
                    ← 返回首页
                </a>
            </nav>
        </header>
    );
}

function SubPageFooter() {
    return (
        <footer className="express-footer">
            <div>
                <strong>速达快运</strong>
                <span>专业快递履约服务 · 首页原型演示</span>
            </div>
            <div className="express-footer-links">
                <a href="#page=home">返回首页</a>
            </div>
        </footer>
    );
}

/* ---------- 子页面：服务条款 ---------- */

const termsSections = [
    {
        title: '一、服务协议',
        content: '本协议是您与速达快运之间关于使用快递寄件、查询及相关服务所订立的协议。使用本服务即表示您同意本协议的全部条款。速达快运有权根据需要不时修订本协议，修订后的协议一经发布即生效。',
    },
    {
        title: '二、用户权利与义务',
        content: '用户应如实填写寄件人和收件人信息，包括姓名、地址和联系电话。用户应确保所寄物品符合国家法律法规及速达快运禁寄品规定，不得寄递违禁品、危险品及法律法规明令禁止运输的物品。用户有权查询运单轨迹、申请理赔及提出服务投诉。',
    },
    {
        title: '三、隐私与数据保护',
        content: '速达快运重视用户隐私保护。我们仅收集为完成快递服务所必需的个人信息，包括寄收件人姓名、电话、地址及包裹信息。未经用户同意，我们不会将个人信息用于服务之外的目的。数据存储和传输均采用行业标准加密技术。用户可随时要求查阅、更正或删除其个人信息。',
    },
    {
        title: '四、运费与结算',
        content: '运费根据包裹重量、体积、寄递距离及所选服务类型计算。个人用户在下单时预付运费，商家用户可选择月结方式。保价费用按声明价值的百分比另行计算。如因速达快运原因导致运费计算错误，差额部分将予以退还或补收。',
    },
    {
        title: '五、理赔规则',
        content: '未保价包裹丢失或损毁，按实际损失赔偿，最高不超过快递服务费的 3 倍。已保价包裹按声明价值赔偿，但最高不超过实际损失金额。用户应在签收后 7 日内对包裹外观异常提出异议，逾期视为完好交付。理赔申请审核通过后，赔付款项将在 5 个工作日内到账。',
    },
    {
        title: '六、免责声明',
        content: '因不可抗力（自然灾害、战争、政府行为等）导致的延误或损失，速达快运不承担责任。因用户填写信息错误、包装不当或寄递禁寄品导致的损失，由用户自行承担。对于间接损失或预期收益损失，速达快运不承担责任。',
    },
];

function TermsPage() {
    return (
        <div className="express-page">
            <SubPageHeader title="服务条款" />
            <main>
                <section className="express-section" data-annotation-id="terms-content">
                    <div className="express-section-heading">
                        <span className="express-section-tag">法律信息</span>
                        <h2>速达快运服务条款</h2>
                        <p>最后更新日期：2026年6月 · 请仔细阅读以下条款，使用本服务即视为同意。</p>
                    </div>
                    <div style={{ maxWidth: '768px', margin: '0 auto' }}>
                        {termsSections.map(function (section) {
                            return (
                                <article key={section.title} style={{ marginBottom: '32px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'oklch(0.21 0.034 264.665)' }}>
                                        {section.title}
                                    </h3>
                                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'oklch(0.373 0.034 259.733)' }}>
                                        {section.content}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
            <SubPageFooter />
        </div>
    );
}

/* ---------- 子页面：帮助中心 ---------- */

const helpCategories = [
    {
        title: '寄件指南',
        icon: PackageCheck,
        articles: ['如何在线下单寄件？', '怎样预约上门取件时间？', '寄件需要准备什么？', '如何填写收件人信息？'],
    },
    {
        title: '运费与时效',
        icon: Clock3,
        articles: ['如何查询运费和送达时间？', '不同服务类型的区别是什么？', '运费计算规则说明', '月结账户如何开通？'],
    },
    {
        title: '物流追踪',
        icon: MapPinned,
        articles: ['如何查询包裹实时轨迹？', '物流状态各节点含义', '为什么物流信息不更新？', '签收确认功能怎么用？'],
    },
    {
        title: '售后与理赔',
        icon: ShieldCheck,
        articles: ['包裹丢失或损坏怎么办？', '理赔申请流程与材料', '保价服务说明与费用', '投诉与建议反馈渠道'],
    },
];

const topQuestions = [
    { q: '下单后可以修改收件地址吗？', a: '在快递员揽收前，您可在订单详情中修改收件地址。揽收后如需修改，请联系客服协助处理，可能产生额外费用。' },
    { q: '如何取消已提交的寄件订单？', a: '快递员揽收前可随时取消订单，费用全额退还。揽收后如需取消，请联系客服申请拦截退回。' },
    { q: '商家批量发货有哪些优惠？', a: '日发 20 单以上的商家可申请月结账户，享受阶梯折扣和专属客服。具体费率请联系商家顾问获取报价。' },
    { q: '支持哪些支付方式？', a: '支持微信支付、支付宝、银行卡在线支付。商家月结客户支持对公转账和月度账单结算。' },
];

function HelpPage() {
    return (
        <div className="express-page">
            <SubPageHeader title="帮助中心" />
            <main>
                <section className="express-section">
                    <div className="express-section-heading">
                        <span className="express-section-tag">帮助中心</span>
                        <h2>有什么可以帮助你的？</h2>
                        <p>查找寄件、运费、物流追踪和售后相关的常见问题与操作指南。</p>
                    </div>

                    <div style={{ maxWidth: '768px', margin: '0 auto 48px' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '12px 16px', border: '1px solid oklch(0.872 0.01 258.338)',
                            borderRadius: '8px', background: 'oklch(0.985 0 0)',
                        }}>
                            <CircleHelp size={18} style={{ color: 'oklch(0.707 0.022 261.325)', flexShrink: 0 }} />
                            <input
                                placeholder={'搜索帮助内容，如"怎样寄件"、"运费查询"...'}
                                style={{
                                    border: 'none', outline: 'none', background: 'transparent',
                                    width: '100%', fontSize: '14px', color: 'oklch(0.21 0.034 264.665)',
                                }}
                            />
                        </div>
                    </div>

                    <div className="express-feature-grid" style={{ maxWidth: '768px', margin: '0 auto 48px' }} data-annotation-id="help-categories">
                        {helpCategories.map(function (cat) {
                            var Icon = cat.icon;
                            return (
                                <article className="express-feature-card" key={cat.title}>
                                    <div className="express-icon-wrap">
                                        <Icon size={20} />
                                    </div>
                                    <h3>{cat.title}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                                        {cat.articles.map(function (article) {
                                            return (
                                                <li key={article} style={{
                                                    padding: '6px 0', fontSize: '13px',
                                                    color: 'oklch(0.446 0.03 256.802)',
                                                    borderBottom: '1px solid oklch(0.967 0.003 264.542)',
                                                    cursor: 'pointer',
                                                }}>
                                                    {article}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="express-section" style={{ background: 'oklch(0.985 0 0)' }} data-annotation-id="help-faq">
                    <div className="express-section-heading">
                        <span className="express-section-tag">热门问题</span>
                        <h2>大家都在问</h2>
                    </div>
                    <div className="express-faq-grid" style={{ maxWidth: '768px', margin: '0 auto' }}>
                        {topQuestions.map(function (item) {
                            return (
                                <article className="express-faq-card" key={item.q}>
                                    <div className="express-faq-title">
                                        <CircleHelp size={18} />
                                        <h3>{item.q}</h3>
                                    </div>
                                    <p>{item.a}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
            <SubPageFooter />
        </div>
    );
}

/* ---------- 子页面：联系我们 ---------- */

const contactMethods = [
    {
        icon: Smartphone,
        title: '客服电话',
        detail: '400-888-9999',
        desc: '7×16 小时人工服务，工作日及周末均可拨打。',
    },
    {
        icon: MapPinned,
        title: '总部地址',
        detail: '上海市浦东新区张江高科技园区速达大厦 A 座 12 层',
        desc: '来访请提前预约，前台登记后由对接人引领进入。',
    },
    {
        icon: Store,
        title: '网点查询',
        detail: '全国 200+ 城市设有直营网点',
        desc: '可通过首页寄件入口查询离你最近的收件网点。',
    },
];

function ContactPage() {
    return (
        <div className="express-page">
            <SubPageHeader title="联系我们" />
            <main>
                <section className="express-section">
                    <div className="express-section-heading">
                        <span className="express-section-tag">联系我们</span>
                        <h2>期待与你的每一次连接。</h2>
                        <p>无论是寄件问题、商家合作还是产品反馈，我们都乐于倾听并快速响应。</p>
                    </div>

                    <div className="express-feature-grid" style={{ maxWidth: '768px', margin: '0 auto 40px' }} data-annotation-id="contact-methods">
                        {contactMethods.map(function (method) {
                            var Icon = method.icon;
                            return (
                                <article className="express-feature-card" key={method.title}>
                                    <div className="express-icon-wrap">
                                        <Icon size={20} />
                                    </div>
                                    <h3>{method.title}</h3>
                                    <p style={{ fontWeight: 600, color: 'oklch(0.21 0.034 264.665)', marginBottom: '4px' }}>
                                        {method.detail}
                                    </p>
                                    <p style={{ fontSize: '13px' }}>{method.desc}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="express-section" style={{ background: 'oklch(0.985 0 0)' }}>
                    <div className="express-section-heading">
                        <span className="express-section-tag">在线留言</span>
                        <h2>快速留言，我们会尽快回复。</h2>
                        <p>填写以下信息，客服团队将在 1 个工作日内通过邮件与你联系。</p>
                    </div>
                    <div style={{ maxWidth: '520px', margin: '0 auto' }} data-annotation-id="contact-form">
                        <div className="express-form-grid">
                            <label>
                                姓名
                                <input placeholder="请输入姓名" />
                            </label>
                            <label>
                                联系电话
                                <input placeholder="请输入手机号" />
                            </label>
                            <label>
                                邮箱地址
                                <input placeholder="请输入邮箱" />
                            </label>
                            <label>
                                咨询类型
                                <input placeholder="请选择：寄件咨询 / 商家合作 / 投诉建议 / 其他" />
                            </label>
                        </div>
                        <label style={{ display: 'block', marginTop: '16px', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                            留言内容
                            <textarea
                                placeholder="请描述你的问题或需求..."
                                rows={4}
                                style={{
                                    width: '100%', border: '1px solid oklch(0.872 0.01 258.338)',
                                    borderRadius: '6px', padding: '10px 12px', fontSize: '14px',
                                    marginTop: '6px', fontFamily: 'inherit', resize: 'vertical',
                                }}
                            />
                        </label>
                        <a
                            className="express-primary-button"
                            href="#"
                            onClick={function (e: React.MouseEvent) { e.preventDefault(); }}
                            style={{ display: 'inline-flex', marginTop: '8px' }}
                        >
                            提交留言
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </section>
            </main>
            <SubPageFooter />
        </div>
    );
}

/* ---------- 首页（提取为独立组件） ---------- */

type Metric = {
    value: string;
    label: string;
    detail: string;
};

type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

type Solution = {
    audience: string;
    title: string;
    summary: string;
    bullets: string[];
    accent: string;
    icon: LucideIcon;
};

type TimelineStep = {
    title: string;
    description: string;
};

type FaqItem = {
    question: string;
    answer: string;
};

const metrics: Metric[] = [
    { value: '30 min', label: '最快上门响应', detail: '主城区高频时段支持快速预约取件。' },
    { value: '99.2%', label: '轨迹可视化签收率', detail: '关键节点实时推送，售后处理更透明。' },
    { value: '200+', label: '覆盖城市与直营网点', detail: '满足个人寄件和小商家跨城履约需求。' },
    { value: '7 x 16h', label: '寄件客服支持', detail: '工作日与高峰期提供人工协助与异常跟进。' },
];

const features: Feature[] = [
    {
        title: '上门取件，寄件更省事',
        description: '手机下单后可预约取件时间，常见文件、礼品、样品和退换货都能快速发走。',
        icon: Truck,
    },
    {
        title: '价格时效一眼看清',
        description: '寄前先查运费和送达时效，减少犹豫和反复沟通。',
        icon: Clock3,
    },
    {
        title: '轨迹透明，异常可追',
        description: '揽收、中转、派送、签收全链路可查，遇到延误和异常有明确节点。',
        icon: MapPinned,
    },
    {
        title: '商家发货更有章法',
        description: '支持批量寄件、地址簿、订单对账和发货数据回看，降低小团队人力成本。',
        icon: ChartColumn,
    },
];

const solutions: Solution[] = [
    {
        audience: '个人寄件',
        title: '寄文件、礼物、退货，都能更快完成',
        summary: '首页突出简单流程和明确承诺，让第一次使用也能快速下单。',
        bullets: ['地址自动补全，减少手动填写', '支持预约上门和附近网点寄件', '显示保价、签收和时效承诺'],
        accent: 'warm',
        icon: Smartphone,
    },
    {
        audience: '小商家发货',
        title: '把每天零散发货，变成可管理的履约动作',
        summary: '更适合私域卖货、社区团购、工作室和轻电商团队的日常发件。',
        bullets: ['批量导入订单和常用地址', '按日查看账单、发货量和异常件', '支持客服协同与售后跟进'],
        accent: 'cool',
        icon: Store,
    },
];

const timeline: TimelineStep[] = [
    { title: '填写寄收信息', description: '输入寄件人、收件人和包裹信息，系统自动校验地址。' },
    { title: '获取报价与时效', description: '根据目的地、重量和服务类型即时显示预计费用与到达时间。' },
    { title: '预约取件或送到网点', description: '按你的节奏发货，个人和商家都能选择更合适的方式。' },
    { title: '全程追踪与签收', description: '轨迹更新、异常提醒和签收结果在一个界面内完成查看。' },
];

const faqItems: FaqItem[] = [
    {
        question: '个人用户可以直接在线下单吗？',
        answer: '可以。首页首屏即提供寄件入口，填写基础信息后即可预约上门或选择就近网点寄件。',
    },
    {
        question: '小商家支持批量发货吗？',
        answer: '支持。可通过常用地址、订单批量导入和发货台账，减少重复录入和人工对单。',
    },
    {
        question: '运费和时效能不能先查再寄？',
        answer: '可以。首页提供运费试算和时效查询模块，帮助用户在下单前做判断。',
    },
    {
        question: '出现延误或异常后怎么办？',
        answer: '系统会展示关键节点并触发异常提醒，客服可按运单快速介入处理。',
    },
];

function NavLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
    return (
        <a className="express-nav-link" href={href}>
            {children}
        </a>
    );
}

function SectionTag({ children }: React.PropsWithChildren) {
    return <span className="express-section-tag">{children}</span>;
}

function FeatureCard({ feature }: { feature: Feature }) {
    const Icon = feature.icon;
    return (
        <article className="express-feature-card">
            <div className="express-icon-wrap">
                <Icon size={20} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
        </article>
    );
}

function SolutionCard({ solution }: { solution: Solution }) {
    const Icon = solution.icon;
    return (
        <article className={`express-solution-card is-${solution.accent}`}>
            <div className="express-solution-head">
                <div>
                    <span>{solution.audience}</span>
                    <h3>{solution.title}</h3>
                </div>
                <div className="express-icon-wrap">
                    <Icon size={20} />
                </div>
            </div>
            <p>{solution.summary}</p>
            <ul>
                {solution.bullets.map((bullet) => (
                    <li key={bullet}>
                        <BadgeCheck size={16} />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function FaqCard({ item }: { item: FaqItem }) {
    return (
        <article className="express-faq-card">
            <div className="express-faq-title">
                <CircleHelp size={18} />
                <h3>{item.question}</h3>
            </div>
            <p>{item.answer}</p>
        </article>
    );
}

function HomePage() {
    return (
        <div className="express-page">
            <header className="express-header" data-annotation-id="home-header">
                <div className="express-logo">
                    <div className="express-logo-mark" aria-hidden="true">
                        <PackageCheck size={18} />
                    </div>
                    <div>
                        <strong>速达快运</strong>
                        <span>Personal & Merchant Delivery</span>
                    </div>
                </div>
                <nav className="express-nav" aria-label="首页导航">
                    <NavLink href="#services">服务优势</NavLink>
                    <NavLink href="#solutions">解决方案</NavLink>
                    <NavLink href="#flow">寄件流程</NavLink>
                    <NavLink href="#faq">常见问题</NavLink>
                </nav>
                <div className="express-header-actions">
                    <a className="express-text-button" href="#query-card">查运费</a>
                    <a className="express-primary-button" href="#ship-card">
                        立即寄件
                        <ArrowRight size={16} />
                    </a>
                </div>
            </header>

            <main>
                <section className="express-hero" data-annotation-id="home-hero">
                    <div className="express-hero-copy">
                        <SectionTag>快递官网首页原型</SectionTag>
                        <h1>个人寄件更省心，小商家发货更有序。</h1>
                        <p className="express-hero-summary">
                            用一个首页同时承接个人下单、运费时效查询和商家发货转化。
                            重点突出专业可信、流程清晰和履约可追踪。
                        </p>
                        <div className="express-hero-points" aria-label="首页卖点">
                            <span>上门取件</span>
                            <span>价格时效查询</span>
                            <span>商家批量发货</span>
                            <span>签收异常可追</span>
                        </div>
                        <div className="express-hero-actions">
                            <a className="express-primary-button" href="#ship-card">
                                立即预约寄件
                                <ArrowRight size={16} />
                            </a>
                            <a className="express-secondary-button" href="#solutions">查看商家方案</a>
                        </div>
                    </div>

                    <div className="express-hero-panels">
                        <section className="express-panel express-order-panel" id="ship-card" data-annotation-id="ship-card">
                            <div className="express-panel-tabs" aria-label="用户类型">
                                <button className="is-active" type="button">个人寄件</button>
                                <button type="button">商家发货</button>
                            </div>
                            <div className="express-panel-header">
                                <h2>在线寄件</h2>
                                <span>最快 30 分钟上门</span>
                            </div>
                            <div className="express-form-grid">
                                <label>
                                    寄件城市
                                    <input defaultValue="上海市 徐汇区" />
                                </label>
                                <label>
                                    收件城市
                                    <input defaultValue="杭州市 西湖区" />
                                </label>
                                <label>
                                    包裹类型
                                    <input defaultValue="文件 / 小件包裹" />
                                </label>
                                <label>
                                    预约时间
                                    <input defaultValue="今天 15:00 - 17:00" />
                                </label>
                            </div>
                            <div className="express-form-footer">
                                <div>
                                    <strong>预估费用</strong>
                                    <span>¥12 起 · 次日达</span>
                                </div>
                                <a className="express-primary-button" href="#cta">提交寄件需求</a>
                            </div>
                        </section>

                        <section className="express-panel express-query-panel" id="query-card" data-annotation-id="query-card">
                            <div className="express-panel-header">
                                <h2>价格时效查询</h2>
                                <span>寄前先判断成本与时效</span>
                            </div>
                            <div className="express-query-route">
                                <span>上海</span>
                                <ArrowRight size={14} />
                                <span>杭州</span>
                            </div>
                            <div className="express-query-options">
                                <article>
                                    <strong>特快专送</strong>
                                    <span>今日揽收，明日送达</span>
                                    <b>¥18</b>
                                </article>
                                <article>
                                    <strong>标准快递</strong>
                                    <span>预计 2 天送达</span>
                                    <b>¥12</b>
                                </article>
                                <article>
                                    <strong>商家轻量发货</strong>
                                    <span>日发 20 单起更合适</span>
                                    <b>月结</b>
                                </article>
                            </div>
                        </section>
                    </div>
                </section>

                <section className="express-metrics" aria-label="服务数据" data-annotation-id="home-metrics">
                    {metrics.map((metric) => (
                        <article className="express-metric-card" key={metric.label}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                            <p>{metric.detail}</p>
                        </article>
                    ))}
                </section>

                <section className="express-section" id="services" data-annotation-id="home-features">
                    <div className="express-section-heading">
                        <SectionTag>服务优势</SectionTag>
                        <h2>官网首页需要先回答用户三个问题：能不能寄、多少钱、靠不靠谱。</h2>
                        <p>所以首页中段围绕效率、透明度和履约能力展开，帮助个人用户放心下单，也让商家看到长期使用价值。</p>
                    </div>
                    <div className="express-feature-grid">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} feature={feature} />
                        ))}
                    </div>
                </section>

                <section className="express-section express-split-section" id="solutions" data-annotation-id="home-solutions">
                    <div className="express-section-heading">
                        <SectionTag>解决方案</SectionTag>
                        <h2>同一个首页，同时服务个人寄件和小商家用户。</h2>
                        <p>首屏负责快速转化，中段通过双场景内容解释为什么这套服务既适合偶发寄件，也适合日常发货。</p>
                    </div>
                    <div className="express-solution-grid">
                        {solutions.map((solution) => (
                            <SolutionCard key={solution.audience} solution={solution} />
                        ))}
                    </div>
                </section>

                <section className="express-section express-process-section" id="flow" data-annotation-id="home-flow">
                    <div className="express-section-heading">
                        <SectionTag>寄件流程</SectionTag>
                        <h2>让用户在首页就知道接下来会发生什么。</h2>
                        <p>对新用户来说，流程清楚本身就是信任感；对商家来说，流程标准化意味着可复制的发货效率。</p>
                    </div>
                    <div className="express-timeline">
                        {timeline.map((step, index) => (
                            <article className="express-timeline-card" key={step.title}>
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="express-trust-band" data-annotation-id="home-trust">
                    <article>
                        <ShieldCheck size={22} />
                        <div>
                            <strong>保障承诺</strong>
                            <p>支持保价、签收确认和异常件跟进，让关键包裹更可控。</p>
                        </div>
                    </article>
                    <article>
                        <Building2 size={22} />
                        <div>
                            <strong>直营网点协同</strong>
                            <p>直营网点、客服和配送环节数据联动，提升服务一致性。</p>
                        </div>
                    </article>
                    <article>
                        <Box size={22} />
                        <div>
                            <strong>商家履约管理</strong>
                            <p>从下单、揽收到对账，帮助小商家减少手工记录和沟通成本。</p>
                        </div>
                    </article>
                </section>

                <section className="express-section" id="faq" data-annotation-id="home-faq">
                    <div className="express-section-heading">
                        <SectionTag>常见问题</SectionTag>
                        <h2>把下单前最常见的顾虑，提前解决。</h2>
                        <p>FAQ 适合作为首页底部的信任补充区，既能回答个人用户问题，也能承接商家咨询。</p>
                    </div>
                    <div className="express-faq-grid">
                        {faqItems.map((item) => (
                            <FaqCard key={item.question} item={item} />
                        ))}
                    </div>
                </section>

                <section className="express-cta" id="cta" data-annotation-id="home-cta">
                    <div>
                        <SectionTag>最终转化</SectionTag>
                        <h2>今天就把第一次寄件，或者下一批订单发出去。</h2>
                        <p>个人用户可直接预约取件，小商家可先联系顾问配置月结和批量发货方案。</p>
                    </div>
                    <div className="express-cta-actions">
                        <a className="express-primary-button" href="#ship-card">
                            立即寄件
                            <ArrowRight size={16} />
                        </a>
                        <a className="express-secondary-button" href="#solutions">咨询商家合作</a>
                    </div>
                </section>
            </main>

            <footer className="express-footer">
                <div>
                    <strong>速达快运</strong>
                    <span>专业快递履约服务 · 首页原型演示</span>
                </div>
                <div className="express-footer-links">
                    <a href="#page=terms">服务条款</a>
                    <a href="#page=help">帮助中心</a>
                    <a href="#page=contact">联系我们</a>
                </div>
            </footer>
        </div>
    );
}

/* ---------- 主入口：hash 路由 ---------- */

const route = {
    pages: [
        { id: 'home', title: '首页' },
        { id: 'terms', title: '服务条款' },
        { id: 'help', title: '帮助中心' },
        { id: 'contact', title: '联系我们' },
    ],
    defaultPageId: 'home',
};

export default function ExpressHomepagePrototype() {
    const { page, setPage } = useHashPage(route);

    const annotationOptions = useMemo<AnnotationViewerOptions>(() => ({
        showToolbar: true,
        showColorFilter: true,
        currentPageId: page,
        onDirectoryRoute: (node: AnnotationDirectoryRouteNode) => {
            if (typeof node.route === 'string') {
                setPage(node.route);
            }
        },
    }), [page, setPage]);

    const pageContent = (() => {
        switch (page) {
            case 'terms':
                return <TermsPage />;
            case 'help':
                return <HelpPage />;
            case 'contact':
                return <ContactPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    })();

    return (
        <>
            {pageContent}
            <AnnotationViewer
                source={annotationSourceDocument}
                options={annotationOptions}
            />
        </>
    );
}
