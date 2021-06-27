const someTimesAgoSelector =
  '.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw';
const postSelector = '.du4w35lb.k4urcfbm.l9j0dhe7.sjgh65i0';
const titleSelector =
  '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.a5q79mjw.g1cxx5fr.lrazzd5p.oo9gr5id.hzawbc8m > span';
const priceSelector =
  '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.knj5qynh.oo9gr5id.hzawbc8m > span';
const priceAuthSelector =
  '.qzhwtbm6.knvmm38d:nth-child(1) > .d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.mdeji52x.e9vueds3.j5wam9gi.knj5qynh.m9osqain.hzawbc8m > span > span > div';
const addressSelector = `${priceSelector} > span:nth-child(3)`;
const descriptionSelector = '.dati1w0a.f10w8fjw.hv4rvrfc.jb3vyjys > span';
const descriptionAuthSelector =
  '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.knj5qynh.oo9gr5id.hzawbc8m';
const photosContainerSelector =
  '.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.k4urcfbm.ni8dbmo4.stjgntxs.sbcfpzgs > div > div > div > div:nth-child(3) > div > .l9j0dhe7:nth-child(3) > div > div > .l9j0dhe7 > .l9j0dhe7';
const photosAuthContainerSelector =
  '.rq0escxv.a8c37x1j.rz4wbd8a.a8nywdso> div > div > div';
const photosContainerSecondVariantSelector =
  '.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.k4urcfbm.ni8dbmo4.stjgntxs.sbcfpzgs > div > div > div > div:nth-child(3) > div > .l9j0dhe7:nth-child(3) > div > a';
const photoSelector =
  'img.i09qtzwb.n7fi1qx3.datstx6m.pmk7jnqg.j9ispegn.kr520xx4.k4urcfbm';
const showAllDescriptionSelector =
  ".oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p[role='button']";
const partOfDescriptionSelector = '.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql';
const dateSelector =
  '.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw > span > span > span:nth-child(2)';
const dateAuthSelector =
  '.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw > span';
const loginButtonSelector =
  '.oajrlxb2.gs1a9yip.s1i5eluu.mtkw9kbi.tlpljxtp.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9.pq6dq46d.mg4g778l.btwxx1t3.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jb3vyjys.d1544ag0.r8blr3vg.tw6a2znq.l9j0dhe7.i1ao9s8h.esuyzwwr.f1sip0of.du4w35lb.lzcic4wl.abiwlrkh.p8dawk7l.beltcj47.p86d2i9g.aot14ch1.kzx2olss.qypqp5cg.ni8dbmo4.stjgntxs';
const authBarSelector =
  '.ehxjyohh.kr520xx4.poy2od1o.b3onmgus.hv4rvrfc.n7fi1qx3';

export const desktopSelectors = {
  someTimesAgo: someTimesAgoSelector,
  post: postSelector,
  title: titleSelector,
  price: priceSelector,
  priceAuth: priceAuthSelector,
  address: addressSelector,
  description: descriptionSelector,
  descriptionAuth: descriptionAuthSelector,
  photos: photosContainerSelector,
  photosAuth: photosAuthContainerSelector,
  photosSecondVariant: photosContainerSecondVariantSelector,
  photo: photoSelector,
  showAllDescription: showAllDescriptionSelector,
  partOfDescription: partOfDescriptionSelector,
  date: dateSelector,
  dateAuth: dateAuthSelector,
  loginButton: loginButtonSelector,
  authBar: authBarSelector,
};
