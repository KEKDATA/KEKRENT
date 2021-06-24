const someTimesAgoSelector =
  '.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw';
const postSelector = '.du4w35lb.k4urcfbm.l9j0dhe7.sjgh65i0';
const titleSelector =
  '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.a5q79mjw.g1cxx5fr.lrazzd5p.oo9gr5id.hzawbc8m > span';
const priceSelector =
  '.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d9wwppkn.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.knj5qynh.oo9gr5id.hzawbc8m > span';
const addressSelector = `${priceSelector} > span:nth-child(3)`;
const descriptionSelector = '.dati1w0a.f10w8fjw.hv4rvrfc.jb3vyjys > span';
const photosContainerSelector =
  '.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.k4urcfbm.ni8dbmo4.stjgntxs.sbcfpzgs > div > div > div > div:nth-child(3) > div > .l9j0dhe7:nth-child(3) > div > div > .l9j0dhe7 > .l9j0dhe7';
const photosContainerSecondVariantSelector =
  '.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.k4urcfbm.ni8dbmo4.stjgntxs.sbcfpzgs > div > div > div > div:nth-child(3) > div > .l9j0dhe7:nth-child(3) > div > a';
const photoSelector =
  'img.i09qtzwb.n7fi1qx3.datstx6m.pmk7jnqg.j9ispegn.kr520xx4.k4urcfbm';
const showAllDescriptionSelector =
  ".oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p[role='button']";
const partOfDescriptionSelector = '.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql';
const dateSelector =
  '.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw > span > span > span:nth-child(2)';

export const desktopSelectors = {
  someTimesAgo: someTimesAgoSelector,
  post: postSelector,
  title: titleSelector,
  price: priceSelector,
  address: addressSelector,
  description: descriptionSelector,
  photos: photosContainerSelector,
  photosSecondVariant: photosContainerSecondVariantSelector,
  photo: photoSelector,
  showAllDescription: showAllDescriptionSelector,
  partOfDescription: partOfDescriptionSelector,
  date: dateSelector,
};
