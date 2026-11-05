const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function context() {
  const html = read('index.html');
  const ctx = vm.createContext({localStorage:{getItem:()=>null},document:{addEventListener(){}},shortStayOptions:[{id:'room',label:'Room',room:'501',query:'Hotel SARA',lead:'Rest'}],venueGuides:{},shopClusters:{},shopClustersForPlan:()=>['test','other'],mapBaseHotel:()=>['Hotel','','','','Hotel Tokyo']});
  vm.runInContext(read('assets/food-options.js').split('\n')[1], ctx);
  vm.runInContext(read('assets/food-guide.js').split('\n').slice(0,2).join('\n'), ctx);
  vm.runInContext(html.slice(html.indexOf('const days=['),html.indexOf('const hotels=')),ctx);
  vm.runInContext(read('assets/trip-plan.js'),ctx);
  vm.runInContext(read('assets/meal-plans.js'),ctx);
  vm.runInContext("['test','other','akiba-culture','akiba-adult'].forEach(id=>shopClusters[id]={title:'Shops'})",ctx);
  return ctx;
}
test('every date and alternative route keeps two real candidates per meal',()=>{
  const ctx=context();
  for(const shops of ['base','fashion','local','books','east']) for(const night of ['base','room']) {
    vm.runInContext(`planChoices.shops=${JSON.stringify(shops)};planChoices.night=${JSON.stringify(night)}`,ctx);
    for(let day=0;day<5;day++) {
      const result=JSON.parse(vm.runInContext(`JSON.stringify({plan:mealsForDay(${day}),stops:plannedDay(${day}).stops,foods:foods})`,ctx));
      for(const key of ['lunch','dinner']) {
        const ids=result.plan[key].ids;
        assert.ok(new Set(ids).size>=2,`${day} ${shops} ${night} ${key}`);
        for(const id of ids){const f=result.foods.find(f=>f.id===id);assert.ok(f?.days.includes(day));assert.ok(f.query&&f.menu&&f.orders.length);assert.notEqual(id,'oedo-haneda');}
        const slots=result.stops.filter(s=>s.meal===key);
        assert.equal(slots.length,1);assert.deepEqual(slots[0].mealCandidates,ids);
      }
      assert.ok(result.stops.findIndex(s=>s.meal==='lunch')<result.stops.findIndex(s=>s.meal==='dinner'));
      assert.equal(new Set(result.stops.map(s=>s.checkId)).size,result.stops.length,'Checklist IDs must stay unique');
      assert.ok(!result.plan.lunch.ids.some(id=>result.plan.dinner.ids.includes(id)),'Lunch and dinner should have distinct choices');
    }
  }
});
test('Comiket lunch fits before departure; New Year dinner replaces free choice',()=>{
  const ctx=context();
  const stops=JSON.parse(vm.runInContext('JSON.stringify(plannedDay(1).stops)',ctx));
  const lunch=stops.find(s=>s.meal==='lunch');
  assert.ok(lunch.end<=stops.find(s=>s.title==='도쿄 빅사이트로 출발').t);
  assert.equal(vm.runInContext("plannedDay(2).stops.some(s=>s.title.includes('저녁 자유식'))",ctx),false);
});
