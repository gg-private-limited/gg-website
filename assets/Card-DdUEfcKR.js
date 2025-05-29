import{a as b,j as t,m as u}from"./index-Ck2EgO-1.js";const c=b.forwardRef(({children:a,className:o="",variant:s="default",hover:r=!0,animate:i=!0,...d},n)=>{const l=`
    rounded-xl shadow-lg
    ${(()=>{switch(s){case"glass":return"bg-white/10 backdrop-blur-md border border-white/20";case"gradient":return"bg-gradient-to-br from-white to-blue-50 border border-blue-100";case"dark":return"bg-gray-900 border border-gray-700";case"colorful":return"bg-gradient-to-br from-pink-50 to-purple-50 border border-purple-200";default:return"bg-white border border-gray-200"}})()}
    ${r?"hover:shadow-xl hover:scale-[1.02] transition-all duration-300":""}
    ${o}
  `,e=t.jsx("div",{ref:n,className:l,...d,children:a});return i?t.jsx(u.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},whileHover:r?{y:-5}:{},children:e}):e});c.displayName="Card";export{c as C};
