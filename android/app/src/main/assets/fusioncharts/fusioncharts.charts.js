!(function(t) {
  'object' == typeof module && 'undefined' != typeof module.exports
    ? (module.exports = t)
    : t();
})(function() {
  (window.webpackJsonpFusionCharts =
    window.webpackJsonpFusionCharts || []).push([
    [1],
    {
      413: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(414));
        e.Column2D = n['default'];
        var r = o(a(494));
        e.Column3D = r['default'];
        var i = o(a(507));
        e.Line = i['default'];
        var l = o(a(513));
        e.Area = l['default'];
        var s = o(a(515));
        e.Bar2D = s['default'];
        var c = o(a(535));
        e.Bar3D = c['default'];
        var u = o(a(540));
        e.Pie2D = u['default'];
        var d = o(a(546));
        e.Pie3D = d['default'];
        var f = o(a(553));
        e.Doughnut2D = f['default'];
        var h = o(a(555));
        e.Doughnut3D = h['default'];
        var p = o(a(559));
        e.Pareto2D = p['default'];
        var g = o(a(570));
        e.Pareto3D = g['default'];
        var v = o(a(573));
        e.ScrollCombiDy2D = v['default'];
        var m = o(a(584));
        e.ScrollCombi2D = m['default'];
        var b = o(a(589));
        e.ScrollStackedColumn2D = b['default'];
        var C = o(a(593));
        e.ScrollMSStackedColumn2D = C['default'];
        var D = o(a(597));
        e.ScrollMSStackedColumn2dLineDY = D['default'];
        var _ = o(a(601));
        e.ScrollStackedBar2D = _['default'];
        var y = o(a(604));
        e.ScrollArea2D = y['default'];
        var S = o(a(605));
        e.ScrollLine2D = S['default'];
        var k = o(a(607));
        e.ScrollColumn2D = k['default'];
        var x = o(a(608));
        e.ScrollBar2D = x['default'];
        var A = o(a(609));
        e.Bubble = A['default'];
        var P = o(a(622));
        e.Scatter = P['default'];
        var w = o(a(623));
        e.MSStackedColumn2D = w['default'];
        var N = o(a(624));
        e.StackedArea2D = N['default'];
        var F = o(a(628));
        e.StackedBar3D = F['default'];
        var M = o(a(633));
        e.StackedBar2D = M['default'];
        var T = o(a(636));
        e.StackedColumn3D = T['default'];
        var B = o(a(640));
        e.StackedColumn2D = B['default'];
        var L = o(a(642));
        e.MSStackedColumn2DLineDy = L['default'];
        var I = o(a(643));
        e.StackedColumn3DLineDy = I['default'];
        var E = o(a(648));
        e.MSColumn3DLineDy = E['default'];
        var O = o(a(649));
        e.MSCombidy2D = O['default'];
        var R = o(a(650));
        e.MSCombidy3D = R['default'];
        var G = o(a(652));
        e.StackedColumn3DLine = G['default'];
        var V = o(a(655));
        e.StackedColumn2DLine = V['default'];
        var z = o(a(658));
        e.MSColumnLine3D = z['default'];
        var H = o(a(660));
        e.MSCombi3D = H['default'];
        var W = o(a(661));
        e.MSCombi2D = W['default'];
        var Y = o(a(662));
        e.Marimekko = Y['default'];
        var U = o(a(667));
        e.MSArea = U['default'];
        var j = o(a(668));
        e.MSBar3D = j['default'];
        var X = o(a(669));
        e.MSBar2D = X['default'];
        var Z = o(a(670));
        e.MSLine = Z['default'];
        var J = o(a(672));
        e.MSColumn3D = J['default'];
        var q = o(a(673));
        e.MSColumn2D = q['default'];
        var K = o(a(674));
        e.Spline = K['default'];
        var $ = o(a(677));
        e.Splinearea = $['default'];
        var Q = o(a(679));
        e.Msspline = Q['default'];
        var tt = o(a(682));
        e.MSSplineDy = tt['default'];
        var et = o(a(684));
        e.Mssplinearea = et['default'];
        var at = o(a(686));
        e.StackedColumn2DLineDy = at['default'];
        var ot = o(a(688));
        e.StackedArea2DLineDy = ot['default'];
        var nt = {
          name: 'charts',
          type: 'package',
          requiresFusionCharts: !0,
          extension: function(t) {
            t.addDep(n['default']),
              t.addDep(r['default']),
              t.addDep(i['default']),
              t.addDep(l['default']),
              t.addDep(s['default']),
              t.addDep(c['default']),
              t.addDep(u['default']),
              t.addDep(d['default']),
              t.addDep(f['default']),
              t.addDep(h['default']),
              t.addDep(p['default']),
              t.addDep(g['default']),
              t.addDep(v['default']),
              t.addDep(m['default']),
              t.addDep(b['default']),
              t.addDep(C['default']),
              t.addDep(D['default']),
              t.addDep(_['default']),
              t.addDep(y['default']),
              t.addDep(S['default']),
              t.addDep(k['default']),
              t.addDep(x['default']),
              t.addDep(A['default']),
              t.addDep(P['default']),
              t.addDep(w['default']),
              t.addDep(N['default']),
              t.addDep(F['default']),
              t.addDep(M['default']),
              t.addDep(T['default']),
              t.addDep(B['default']),
              t.addDep(L['default']),
              t.addDep(I['default']),
              t.addDep(at['default']),
              t.addDep(ot['default']),
              t.addDep(E['default']),
              t.addDep(O['default']),
              t.addDep(R['default']),
              t.addDep(G['default']),
              t.addDep(V['default']),
              t.addDep(z['default']),
              t.addDep(H['default']),
              t.addDep(W['default']),
              t.addDep(Y['default']),
              t.addDep(U['default']),
              t.addDep(j['default']),
              t.addDep(X['default']),
              t.addDep(Z['default']),
              t.addDep(J['default']),
              t.addDep(q['default']),
              t.addDep(K['default']),
              t.addDep($['default']),
              t.addDep(tt['default']),
              t.addDep(Q['default']),
              t.addDep(et['default']);
          },
        };
        e['default'] = nt;
      },
      414: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(415))['default'];
        e['default'] = n;
      },
      415: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(416)),
          i = o(a(492)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Column2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Column2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this),
                  (this.config.friendlyName = 'Column Chart'),
                  (this.config.singleseries = !0),
                  (this.config.defaultDatasetType = 'column'),
                  (this.config.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      494: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(495))['default'];
        e['default'] = n;
      },
      495: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(496)),
          i = o(a(504)),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.defaultZeroPlaneHighlighted = !1),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Column3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Column3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.hasLegend = !1),
                  (e.singleseries = !0),
                  (e.friendlyName = '3D Column Chart'),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      496: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(416)),
          i = o(a(497)),
          l = o(a(501)),
          s = (function(t) {
            function e() {
              var e;
              return (
                (e = t.call(this) || this).registerFactory(
                  'canvas',
                  i['default'],
                ),
                e.registerFactory('dataset', l['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'SSCartesian3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'SSCartesian3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.hasLegend = !1),
                  (e.showplotborder = 0),
                  (e.drawcrosslineontop = 0),
                  (e.showzeroplaneontop = 0);
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      497: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e;
            if (
              ((0, i.componentFactory)(
                t,
                n['default'],
                'canvas',
                t.config.showVolumeChart ? 2 : 1,
              ),
              (e = t.getChildren('canvas')))
            )
              for (var a = 0, o = e.length; a < o; a++)
                e[a].configure(),
                  (0, i.componentFactory)(
                    e[a],
                    r['default'],
                    'axisRefVisualCartesian',
                  );
          });
        var n = o(a(498)),
          r = o(a(485)),
          i = a(193);
      },
      498: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(421)),
          i = a(193),
          l = a(201),
          s = o(a(499)),
          c = o(a(500)),
          u = (0, l.getDep)('redraphael', 'plugin'),
          d = i.preDefStr.ROUND,
          f = i.preDefStr.miterStr,
          h = Math.max,
          p = u,
          g = 'M',
          v = {
            chart2D: {
              bgColor: 'bgColor',
              bgAlpha: 'bgAlpha',
              bgAngle: 'bgAngle',
              bgRatio: 'bgRatio',
              canvasBgColor: 'canvasBgColor',
              canvasBaseColor: 'canvasBaseColor',
              divLineColor: 'divLineColor',
              legendBgColor: 'legendBgColor',
              legendBorderColor: 'legendBorderColor',
              toolTipbgColor: 'toolTipbgColor',
              toolTipBorderColor: 'toolTipBorderColor',
              baseFontColor: 'baseFontColor',
              anchorBgColor: 'anchorBgColor',
            },
            chart3D: {
              bgColor: 'bgColor3D',
              bgAlpha: 'bgAlpha3D',
              bgAngle: 'bgAngle3D',
              bgRatio: 'bgRatio3D',
              canvasBgColor: 'canvasBgColor3D',
              canvasBaseColor: 'canvasBaseColor3D',
              divLineColor: 'divLineColor3D',
              divLineAlpha: 'divLineAlpha3D',
              legendBgColor: 'legendBgColor3D',
              legendBorderColor: 'legendBorderColor3D',
              toolTipbgColor: 'toolTipbgColor3D',
              toolTipBorderColor: 'toolTipBorderColor3D',
              baseFontColor: 'baseFontColor3D',
              anchorBgColor: 'anchorBgColor3D',
            },
          },
          m = function() {
            this.hide();
          },
          b = function() {
            this.hide(), this._.cubeside.hide(), this._.cubetop.hide();
          },
          C = function() {
            this.show(), this._.cubeside.show(), this._.cubetop.show();
          };
        (0, l.addDep)({
          name: 'canvas3dAnimation',
          type: 'animationRule',
          extension: s['default'],
        }),
          (0, c['default'])(u);
        var D = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getName = function() {
              return 'canvas';
            }),
            (a.getType = function() {
              return 'canvas';
            }),
            (a.drawCanvas = function() {
              this.getFromEnv('chart').isBar
                ? this.drawCanvas3dBar()
                : this.drawCanvas3dColumn();
            }),
            (a.configureAttributes = function() {
              t.prototype.configureAttributes.call(this),
                (this.config.xDepth = 10),
                (this.config.yDepth = 10);
            }),
            (a.drawCanvas3dColumn = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                l,
                s,
                c,
                d,
                p,
                D,
                _,
                y,
                S,
                k,
                x = this.getFromEnv('chart'),
                A = x.getFromEnv('dataSource'),
                P = this.config,
                w = x.config,
                N = P.canvasLeft,
                F = P.canvasTop,
                M = P.canvasWidth,
                T = P.canvasHeight,
                B = A.chart,
                L = this.getFromEnv('animationManager'),
                I = x.getFromEnv('color-manager'),
                E = this.getGraphicalElement('canvasBorderElement'),
                O = this.getGraphicalElement('canvasElement'),
                R = this.config,
                G = (R.clip = {}),
                V = this.getContainer('canvasGroup'),
                z = this.getGraphicalElement('canvasBg'),
                H = this.getGraphicalElement('canvas3DBase'),
                W = x.getChildContainer('plotGroup'),
                Y = x.getChildContainer('datalabelsGroup'),
                U = this.getGraphicalElement('canvas3dbaseline'),
                j = R.canvasBgColor,
                X = (R.showCanvasBG = Boolean(
                  (0, i.pluckNumber)(B.showcanvasbg, 1),
                )),
                Z = w.canvasBgDepth,
                J = w.showCanvasBase,
                q = w.canvasBaseDepth,
                K = (R.canvasBaseColor3D = (0, i.pluck)(
                  B.canvasbasecolor,
                  I.getColor('canvasBaseColor3D'),
                )),
                $ = (R.use3DLighting = (0, i.pluckNumber)(B.use3dlighting, 1)),
                Q = v.chart3D,
                tt = (R.canvasBorderRadius = (0, i.pluckNumber)(
                  B.plotborderradius,
                  0,
                )),
                et = (R.canvasBorderColor = (0, i.convertColor)(
                  (0, i.pluck)(
                    B.canvasbordercolor,
                    I.getColor(i.canvasBorderColorStr),
                  ),
                )),
                at = (R.canBGAlpha = (0, i.pluck)(
                  B.canvasbgalpha,
                  I.getColor('canvasBgAlpha'),
                )),
                ot = (R.canBGColor = (0, i.pluck)(
                  B.canvasbgcolor,
                  I.getColor(Q.canvasBgColor),
                )),
                nt = w.canvasBasePadding || 2;
              (j = R.canvasBgColor = $
                ? {
                    FCcolor: {
                      color:
                        (0, i.getDarkColor)(ot, 85) +
                        i.COMMASTRING +
                        (0, i.getLightColor)(ot, 55),
                      alpha: at + i.COMMASTRING + at,
                      ratio: i.BGRATIOSTRING,
                      angle: (0, i.getAngle)(
                        w.width - (w.marginLeft + w.marginRight),
                        w.height - (w.marginTop + w.marginBottom),
                        1,
                      ),
                    },
                  }
                : (0, i.convertColor)(ot, at)),
                (ot = ot.split(i.COMMASTRING)[0]),
                (at = at.split(i.COMMASTRING)[0]),
                (S = R.xDepth),
                (k = R.yDepth),
                (r = {
                  x: N - 0,
                  y: F - 0,
                  width: M + 0,
                  height: T + 0,
                  r: tt,
                  'stroke-width': 0,
                  stroke: et,
                  'stroke-linejoin': f,
                }),
                (t = L.setAnimation({
                  el: E || 'rect',
                  attr: r,
                  component: this,
                  label: 'canvas',
                  container: V,
                })),
                E || this.addGraphicalElement('canvasBorderElement', t),
                (G['clip-canvas'] = [
                  h(0, N - S),
                  h(0, F),
                  h(1, M + S),
                  h(1, T + k),
                ]),
                (G['clip-canvas-init'] = [
                  h(0, N - S),
                  h(0, F - k),
                  1,
                  h(1, T + 2 * k),
                ]),
                (_ = G['clip-canvas'].slice(0)),
                L.setAnimation({
                  el: W,
                  attr: {'clip-rect': _},
                  component: this,
                }),
                L.setAnimation({
                  el: Y,
                  attr: {'clip-rect': _},
                  component: this,
                }),
                (r = {
                  x: N,
                  y: F,
                  width: M,
                  height: T,
                  r: tt,
                  'stroke-width': 0,
                  stroke: 'none',
                  fill: (0, i.toRaphaelColor)(j),
                }),
                (e = L.setAnimation({
                  el: O || 'rect',
                  attr: r,
                  component: this,
                  label: 'canvas',
                  callback: X ? i.stubFN : m,
                  container: V,
                })),
                O || this.addGraphicalElement('canvasElement', e),
                (n = [
                  g,
                  N + M,
                  F,
                  'L',
                  N + M + Z,
                  F + 1.2 * Z,
                  N + M + Z,
                  F + T - Z,
                  N + M,
                  F + T,
                  'Z',
                ]),
                (a = L.setAnimation({
                  el: z || 'path',
                  attr: {
                    path: n,
                    'stroke-width': 0,
                    stroke: 'none',
                    fill: (0, i.toRaphaelColor)(j),
                  },
                  component: this,
                  label: 'canvas',
                  callback: X ? i.stubFN : m,
                  container: V,
                })),
                z || this.addGraphicalElement('canvasBg', a),
                X ? (a.show(), e.show()) : (a.hide(), e.hide()),
                (l = N - S - nt),
                (s = F + T + k + nt),
                (c = M),
                (d = q),
                (p = S + nt),
                (D = k + nt),
                (o = L.setAnimation({
                  el: H || 'cubepath',
                  component: this,
                  index: 0,
                  attr: {
                    cubepath: [l, s, c, d, p, D],
                    stroke: 'none',
                    'stroke-width': 0,
                    visibility: J ? 'visible' : 'hidden',
                    fill: K.replace(i.dropHash, i.HASHSTRING),
                    noGradient: !$,
                  },
                  callback: J ? i.stubFN : b,
                  label: 'canvas',
                  container: V,
                })),
                H || this.addGraphicalElement('canvas3DBase', o),
                (y = L.setAnimation({
                  el: U || 'path',
                  attr: {
                    path: [g, N, F + T, 'H', M + N],
                    stroke: u.tintshade(
                      K.replace(i.dropHash, i.HASHSTRING),
                      0.05,
                    ).rgba,
                  },
                  component: this,
                  callback: J ? i.stubFN : m,
                  label: 'canvas',
                  container: V,
                })),
                U || this.addGraphicalElement('canvas3dbaseline', y),
                J && (C.call(o), y.show());
            }),
            (a.drawCanvas3dBar = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                l,
                s,
                c,
                u,
                D,
                _,
                y,
                S,
                k = this.getFromEnv('chart'),
                x = k.getFromEnv('dataSource'),
                A = k.config,
                P = A.canvasLeft,
                w = A.canvasTop,
                N = A.canvasWidth,
                F = A.canvasHeight,
                M = x.chart,
                T = k.getFromEnv('color-manager'),
                B = this.getGraphicalElement('canvasBorderElement'),
                L = this.getGraphicalElement('canvasElement'),
                I = this.config,
                E = (I.clip = {}),
                O = this.getContainer('canvasGroup'),
                R = this.getGraphicalElement('canvasBg'),
                G = this.getGraphicalElement('canvas3DBase'),
                V = k.getChildContainer('plotGroup'),
                z = k.getChildContainer('datalabelsGroup'),
                H = this.getFromEnv('animationManager'),
                W = this.getGraphicalElement('canvas3dbaseline'),
                Y = I.canvasBgColor,
                U = (I.showCanvasBG = Boolean(
                  (0, i.pluckNumber)(M.showcanvasbg, 1),
                )),
                j = A.canvasBgDepth,
                X = A.showCanvasBase,
                Z = A.canvasBaseDepth,
                J = (I.canvasBaseColor3D = (0, i.pluck)(
                  M.canvasbasecolor,
                  T.getColor('canvasBaseColor3D'),
                )),
                q = (I.use3DLighting = (0, i.pluckNumber)(M.use3dlighting, 1)),
                K = v.chart3D,
                $ = (I.canvasBorderRadius = (0, i.pluckNumber)(
                  M.plotborderradius,
                  0,
                )),
                Q = (I.canvasBorderWidth = 0),
                tt = 0.5 * Q,
                et = (I.canvasBorderColor = (0, i.convertColor)(
                  (0, i.pluck)(
                    M.canvasbordercolor,
                    T.getColor(i.canvasBorderColorStr),
                  ),
                )),
                at = (I.canBGAlpha = (0, i.pluck)(
                  M.canvasbgalpha,
                  T.getColor('canvasBgAlpha'),
                )),
                ot = (I.canBGColor = (0, i.pluck)(
                  M.canvasbgcolor,
                  T.getColor(K.canvasBgColor),
                )),
                nt = I.xDepth,
                rt = I.yDepth;
              (Y = I.canvasBgColor = q
                ? {
                    FCcolor: {
                      color:
                        (0, i.getDarkColor)(ot, 85) +
                        ',' +
                        (0, i.getLightColor)(ot, 55),
                      alpha: at + ',' + at,
                      ratio: i.BGRATIOSTRING,
                      angle: (0, i.getAngle)(
                        A.width - (A.marginLeft + A.marginRight),
                        A.height - (A.marginTop + A.marginBottom),
                        1,
                      ),
                    },
                  }
                : (0, i.convertColor)(ot, at)),
                (ot = ot.split(',')[0]),
                (at = at.split(',')[0]),
                (nt = I.xDepth = 5),
                (rt = I.yDepth = 5),
                (n = {
                  x: P - tt,
                  y: w - tt,
                  width: N + Q,
                  height: F + Q,
                  r: $,
                  'stroke-width': Q,
                  stroke: et,
                  'stroke-linejoin': Q > 2 ? d : f,
                }),
                (t = H.setAnimation({
                  el: B || 'rect',
                  attr: n,
                  container: O,
                  label: 'canvas',
                  component: this,
                })),
                B || this.addGraphicalElement('canvasBorderElement', t),
                (E['clip-canvas'] = [
                  h(0, P - nt),
                  h(0, w),
                  h(1, N + nt),
                  h(1, F + rt),
                ]),
                (E['clip-canvas-init'] = [
                  h(0, P - nt),
                  h(0, w - rt),
                  1,
                  h(1, F + 2 * rt),
                ]),
                (y = E['clip-canvas'].slice(0)),
                H.setAnimation({
                  el: V,
                  attr: {'clip-rect': y},
                  component: this,
                }),
                H.setAnimation({
                  el: z,
                  attr: {'clip-rect': y},
                  component: this,
                }),
                (n = {
                  x: P,
                  y: w,
                  width: N,
                  height: F,
                  r: $,
                  'stroke-width': 0,
                  stroke: 'none',
                  fill: (0, i.toRaphaelColor)(Y),
                }),
                (e = H.setAnimation({
                  el: L || 'rect',
                  attr: n,
                  component: this,
                  label: 'canvas',
                  container: O,
                })),
                L || this.addGraphicalElement('canvasElement', e),
                (r = [
                  g,
                  P,
                  w,
                  'L',
                  P + 1.2 * j,
                  w - j,
                  P + N - j,
                  w - j,
                  P + N,
                  w,
                  'Z',
                ]),
                (a = H.setAnimation({
                  el: R || 'path',
                  attr: {
                    path: r,
                    'stroke-width': 0,
                    stroke: 'none',
                    fill: (0, i.toRaphaelColor)(Y),
                  },
                  component: this,
                  callback: U ? i.stubFN : m,
                  label: 'canvas',
                  container: O,
                })),
                R || this.addGraphicalElement('canvasBg', a),
                U ? (e.show(), a.show()) : (e.hide(), a.hide()),
                (l = P - nt - Z - 1),
                (s = w + rt + 1),
                (c = Z),
                (u = F),
                (D = nt + 1),
                (_ = rt + 1),
                (o = H.setAnimation({
                  el: G || 'cubepath',
                  attr: {
                    cubepath: [l, s, c, u, D, _],
                    stroke: 'none',
                    'stroke-width': 0,
                    visibility: 'hidden',
                    fill: J.replace(i.dropHash, i.HASHSTRING),
                    noGradient: !q,
                  },
                  component: this,
                  callback: X ? i.stubFN : b,
                  label: 'canvas',
                  container: O,
                })),
                G || this.addGraphicalElement('canvas3DBase', o),
                (S = H.setAnimation({
                  el: W || 'path',
                  attr: {
                    path: [g, P, w, 'V', F + w],
                    stroke: p.tintshade(
                      J.replace(i.dropHash, i.HASHSTRING),
                      0.05,
                    ).rgba,
                  },
                  component: this,
                  callback: X ? i.stubFN : m,
                  label: 'canvas',
                  container: O,
                })),
                W || this.addGraphicalElement('canvas3dbaseline', S),
                X && (S.show(), C.call(o));
            }),
            e
          );
        })(r['default']);
        e['default'] = D;
      },
      499: function(t, e, a) {
        'use strict';
        (e.__esModule = !0), (e['default'] = void 0);
        var o = {
          'initial.canvas.canvas': {
            'canvas.appearing': [
              {
                initialAttr: {opacity: 0},
                finalAttr: {opacity: 1},
                slot: 'initial',
              },
            ],
          },
        };
        e['default'] = o;
      },
      500: function(t, e, a) {
        'use strict';
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a = Math.atan2;
            t.define &&
              t.define([
                {
                  name: 'cubepath',
                  cubepath: function() {
                    var a,
                      n,
                      r,
                      i,
                      l = this,
                      s = {
                        'stroke-linejoin': 'round',
                        'shape-rendering': 'precision',
                        stroke: 'none',
                      },
                      c = arguments,
                      u = c.length - 1,
                      d = c[u],
                      f = function(t, a, n, r, i, l) {
                        var s = this,
                          c = s._.cubetop,
                          u = s._.cubeside,
                          d = t,
                          f = a,
                          h = n,
                          p = r,
                          g = i,
                          v = l;
                        return 'object' == typeof d ||
                          (d === e &&
                            f === e &&
                            h === e &&
                            p === e &&
                            g === e &&
                            v === e)
                          ? this
                          : ((d = (0, o.pluckNumber)(d, s.attrs.x, 0)),
                            (f = (0, o.pluckNumber)(f, s.attrs.y, 0)),
                            (h = (0, o.pluckNumber)(h, s.attrs.width, 0)),
                            (p = (0, o.pluckNumber)(p, s.attrs.height, 0)),
                            (g = (0, o.pluckNumber)(g, s.attrs.xDepth, 0)),
                            (v = (0, o.pluckNumber)(v, s.attrs.yDepth, 0)),
                            (s.attrs.x = d),
                            (s.attrs.y = f),
                            (s.attrs.width = h),
                            (s.attrs.height = p),
                            (s.attrs.xDepth = g),
                            (s.attrs.yDepth = v),
                            s._attr('path', [
                              'M',
                              d + h,
                              f,
                              'l',
                              0,
                              p,
                              -h,
                              0,
                              0,
                              -p,
                              'z',
                            ]),
                            c.attr('path', [
                              'M',
                              d,
                              f,
                              'l',
                              1,
                              1,
                              h - 1,
                              0,
                              0,
                              -1,
                              g,
                              -v,
                              -h,
                              0,
                              'z',
                            ]),
                            u.attr('path', [
                              'M',
                              d + h - 1,
                              f + 1,
                              'l',
                              0,
                              p - 1,
                              1,
                              0,
                              g,
                              -v,
                              0,
                              -p,
                              -g,
                              v,
                            ]),
                            this);
                      },
                      h = function(t, e, a, o) {
                        var n = this,
                          r = n._.cubetop,
                          i = n._.cubeside;
                        return (
                          n.dropshadow &&
                            (r.dropshadow(t, -e, a, o),
                            i.dropshadow(t, -e, a, o)),
                          !1
                        );
                      };
                    for (r in (d && d.constructor === t.el.constructor
                      ? (c[u] = e)
                      : (d = e),
                    (a = l.path(s, d)),
                    (n = l.path(s, d)),
                    ((i = l.path(s, d))._.cubetop = a.follow(i, e, 'before')),
                    (i._.cubeside = n.follow(i, e, 'before')),
                    t.fn.cubepath.ca))
                      i.ca[r] = t.fn.cubepath.ca[r];
                    return (
                      (i._attr = i.attr),
                      (i._shadow = i.shadow),
                      (i.attr = function(t, a) {
                        var o = 'object' == typeof t,
                          n = a;
                        return (
                          o &&
                            (t.cubepath
                              ? (n = [].concat(t.cubepath))
                              : ((n = []).push(t.x),
                                n.push(t.y),
                                n.push(t.width),
                                n.push(t.height),
                                n.push(t.xDepth),
                                n.push(t.yDepth)),
                            t.noGradient !== e &&
                              (i.attrs.noGradient = t.noGradient)),
                          t === e && n === e
                            ? this.attrs
                            : n === e
                            ? this.attrs[t]
                            : (o
                                ? f.apply(this, n)
                                : 'drop-shadow' === t &&
                                  h.apply(this, [].concat(n)),
                              i._attr(t),
                              this)
                        );
                      }),
                      (i.appendTo = function(t) {
                        t.appendChild(i._.cubetop),
                          t.appendChild(i._.cubeside),
                          t.appendChild(i);
                      }),
                      'object' == typeof c[0]
                        ? i.attr(c[0])
                        : f.apply(i, [c[0], c[1], c[2], c[3], c[4], c[5]])
                    );
                  },
                  fn: {
                    _getBBox2: function() {
                      var t = this._.cubeside.getBBox(),
                        e = this._.cubetop.getBBox(),
                        a = this.getBBox();
                      return {
                        x: a.x + e.height,
                        y: a.y - t.width,
                        width: a.width,
                        height: a.height,
                      };
                    },
                    shadow: function() {
                      return (
                        this._.cubeside.shadow.apply(
                          this._.cubeside,
                          arguments,
                        ),
                        this._.cubetop.shadow.apply(this._.cubetop, arguments),
                        this._shadow.apply(this, arguments)
                      );
                    },
                  },
                  ca: {
                    'stroke-linejoin': function() {
                      return {'stroke-linejoin': 'round'};
                    },
                    fill: function(o, n) {
                      var r,
                        i = this,
                        l = i._.cubetop,
                        s = i._.cubeside,
                        c = i._attr('cubepath') || [0, 0, 0, 0, 0, 0],
                        u = o,
                        d = n,
                        f = c[2],
                        h = c[4],
                        p = c[5];
                      return (
                        d === e && (d = i._attr('noGradient')),
                        'object' == typeof (u = t.color(u)) &&
                          (u = r =
                            'opacity' in u
                              ? 'rgba(' + [u.r, u.g, u.b, u.opacity] + ')'
                              : 'rgb(' + [u.r, u.g, u.b] + ')'),
                        d
                          ? (i._attr('fill', u),
                            l.attr('fill', t.tintshade(u, -0.78).rgba),
                            s.attr('fill', t.tintshade(u, -0.65).rgba))
                          : (i._attr(
                              'fill',
                              [
                                270,
                                t.tintshade(r, 0.55).rgba,
                                t.tintshade(r, -0.65).rgba,
                              ].join('-'),
                            ),
                            s.attr(
                              'fill',
                              [
                                270,
                                t.tintshade(r, -0.75).rgba,
                                t.tintshade(r, -0.35).rgba,
                              ].join('-'),
                            ),
                            l.attr(
                              'fill',
                              [
                                45 + t.deg(a(p, h + f)),
                                t.tintshade(r, -0.78).rgba,
                                t.tintshade(r, 0.22).rgba,
                              ].join('-'),
                            )),
                        !1
                      );
                    },
                  },
                },
              ]);
          });
        var o = a(193);
      },
      501: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              o,
              i = t.getChildren().canvas[0].getChildren('vCanvas')[0],
              l = t.getFromEnv('dataSource'),
              s = l.dataset,
              c = t.config.defaultDatasetType || '',
              u = l.data || (s && s[0].data);
            if (
              ((a = (function(t) {
                var e = [];
                return (
                  (0, n.fcEach)(t, function(t) {
                    'true' !== t.vline &&
                      !0 !== t.vline &&
                      1 !== t.vline &&
                      '1' !== t.vline &&
                      e.push(t);
                  }),
                  {data: e}
                );
              })(u)),
              !(u && 0 !== u.length))
            )
              return void t.setChartMessage();
            (0, n.componentFactory)(i, r['default'], 'datasetGroup_' + c),
              (o = i.getChildren('datasetGroup_' + c)[0]),
              (e = t.getDSdef()),
              (0, n.datasetFactory)(o, e, 'dataset', 1, [a]);
          });
        var n = a(193),
          r = o(a(502));
      },
      502: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = a(208),
          i = a(201),
          l = o(a(503));
        (0, i.addDep)({
          name: 'column3dManagerAnimation',
          type: 'animationRule',
          extension: l['default'],
        });
        var s = (function(t) {
          function e() {
            var e;
            return (e = t.call(this) || this).setState('visible', !0), e;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'group';
            }),
            (a.getName = function() {
              return 'column3d';
            }),
            (a.getCanvasPadding = function() {
              var t,
                e,
                a = {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                };
              return (
                this._mapChildren(function(o) {
                  for (e in (t =
                    (o.getCanvasPadding && o.getCanvasPadding()) || {}))
                    t.hasOwnProperty(e) && (a[e] = Math.max(t[e], a[e]));
                }),
                a
              );
            }),
            (a.createContainer = function() {
              var t,
                e,
                a = this.getFromEnv('animationManager'),
                o = this.getLinkedParent().getChildContainer();
              for (t in o)
                (e = o[t]),
                  !this.getChildContainer(t) &&
                    this.addChildContainer(
                      t,
                      a.setAnimation({
                        el: 'group',
                        attr: {name: 'manager' + t},
                        container: e,
                        component: this,
                        label: 'group',
                      }),
                    );
            }),
            (a.draw3DContainer = function() {
              var t,
                e = this.getFromEnv('animationManager'),
                a = this.getChildContainer('plotGroup3d'),
                o = this.getFromEnv('xAxis').getTicksLen(),
                n = a && a.negative,
                r = a && a.positive,
                i = this.getLinkedParent().getChildContainer()
                  .columnVcanvasGroup;
              for (
                !this.getChildContainer('plotGroup3d') &&
                  this.addChildContainer(
                    'plotGroup3d',
                    e.setAnimation({
                      el: 'group',
                      attr: {name: '3d-plots'},
                      container: i,
                      component: this,
                      label: 'group',
                    }),
                  ),
                  a = this.getChildContainer('plotGroup3d'),
                  this.addToEnv('plotGroup3d', a),
                  n = a.negative = e.setAnimation({
                    el: n || 'group',
                    attr: {name: 'negative-values'},
                    container: a,
                    component: this,
                    label: 'group',
                  }),
                  r = a.positive = e.setAnimation({
                    el: r || 'group',
                    attr: {name: 'positive-values'},
                    container: a,
                    component: this,
                    label: 'group',
                  }),
                  a.zeroPlane = e
                    .setAnimation({
                      el: a.zeroPlane || 'group',
                      attr: {name: 'zero-plane'},
                      container: a,
                      component: this,
                      label: 'group',
                    })
                    .insertBefore(a.positive),
                  (a.negativeGroupArray = a.negativeGroupArray = n.data(
                    'categoryplots',
                  )) ||
                    (n.data('categoryplots', new Array(o)),
                    (a.negativeGroupArray = n.data('categoryplots'))),
                  (a.positiveGroupAarray = a.positiveGroupAarray = r.data(
                    'categoryplots',
                  )) ||
                    (r.data('categoryplots', new Array(o)),
                    (a.positiveGroupAarray = r.data('categoryplots'))),
                  t = 0;
                t < o;
                t++
              )
                (a.negativeGroupArray[t] = e.setAnimation({
                  el: a.negativeGroupArray[t] || 'group',
                  attr: {name: 'negative-group-' + t},
                  container: n,
                  component: this,
                  label: 'group',
                })),
                  (a.positiveGroupAarray[t] = e.setAnimation({
                    el: a.positiveGroupAarray[t] || 'group',
                    attr: {name: 'positive-group-' + t},
                    container: r,
                    component: this,
                    label: 'group',
                  }));
            }),
            (a.drawZeroPlane = function() {
              var t,
                e,
                a = this.getFromEnv('chart'),
                o = a.getFromEnv('animationManager'),
                n = a.isBar,
                r = a.config,
                i = r.use3dlighting,
                l = this.getChildContainer('plotGroup3d'),
                s = this.getFromEnv('yAxis'),
                c = s.getLimit(),
                u = c.max,
                d = c.min,
                f = this.getGraphicalElement('zeroplane'),
                h = {},
                p = r.xDepth,
                g = r.yDepth,
                v = s.getPixel(s.getAxisBase());
              d < 0 && u >= 0
                ? (!this.graphics && (this.graphics = {}),
                  (e = l.zeroPlane),
                  (h.fill = r.zeroPlaneColor),
                  (h.noGradient = !i),
                  (h.stroke = r.zeroPlaneBorderColor || 'none'),
                  (h['stroke-width'] = r.zeroPlaneShowBorder ? 1 : 0),
                  (h.x = n ? v - p : r.canvasLeft - p),
                  (h.y = n ? r.canvasTop + g : v + g),
                  (h.width = n ? 1 : r.canvasWidth),
                  (h.height = n ? r.canvasHeight : 1),
                  (h.xDepth = p),
                  (h.yDepth = g),
                  f && (f.show(), f._.cubetop.show(), f._.cubeside.show()),
                  (t = {
                    el: f || 'cubepath',
                    attr: h,
                    container: e,
                    component: this,
                    label: 'zeroPlane',
                  }))
                : f &&
                  (t = {
                    el: f,
                    attr: n ? {x: v - g} : {y: v + g},
                    component: this,
                    doNotRemove: !0,
                    callback: function() {
                      f.hide(), f._.cubetop.hide(), f._.cubeside.hide();
                    },
                    container: l,
                    label: 'zeroPlane',
                  }),
                t && this.addGraphicalElement('zeroplane', o.setAnimation(t));
            }),
            (a.draw = function() {
              this.createContainer(),
                this.draw3DContainer(),
                this.drawZeroPlane();
            }),
            (a.childChanged = function(t) {
              void 0 === t && (t = {});
              var e,
                a,
                o = this.config,
                n = this.getLinkedParent(),
                r = 0,
                i = this.getState('visible'),
                l = {};
              this._mapChildren(function(t) {
                t.getState('visible') && r++;
              }),
                this.setState('visible', !!r),
                i !== !!r && (a = !0),
                !1 !== t.dataLimitChanged &&
                  (((e = this.getDataLimits()).min === o.range.min &&
                    e.max === o.range.max) ||
                    ((o.range.min = e.min),
                    (o.range.max = e.max),
                    (l.dataLimitChanged = !0),
                    (a = !0))),
                a ? n.childChanged && n.childChanged(l) : this.asyncDraw();
            }),
            (a.getAxisValuePadding = function() {
              var t = {},
                e = -Infinity,
                a = -Infinity;
              return (
                this._mapChildren(function(o) {
                  o.getState('removed') ||
                    ((t =
                      (o.getAxisValuePadding && o.getAxisValuePadding()) || {}),
                    (e = Math.max(e, t.left || -Infinity)),
                    (a = Math.max(a, t.right || -Infinity)));
                }),
                e === -Infinity && (e = 0),
                a === -Infinity && (a = 0),
                this.config.padding ||
                  ((this.config.padding = {}),
                  (this.config.padding.left = e),
                  (this.config.padding.right = a)),
                {left: e, right: a}
              );
            }),
            (a.getDataLimits = function(t) {
              var e,
                a = +Infinity,
                o = -Infinity,
                n = 0,
                r = function(t) {
                  (o = Math.max(o, t.max)), (a = Math.min(a, t.min));
                };
              return (
                this._mapChildren(function(a) {
                  a.getState('removed') ||
                    (!1 !== a.getState('visible')
                      ? (n++, (e = a.getDataLimits(t)), r(e))
                      : t && ((e = a.getDataLimits(t)), r(e)));
                }),
                n ? this.setState('visible', !0) : this.setState('visible', !1),
                this.config.range ||
                  ((this.config.range = {}),
                  (this.config.range.min = this.config.dataMin),
                  (this.config.range.max = this.config.dataMax)),
                {max: o, min: a}
              );
            }),
            (a.isVisible = function() {
              return !this.isNotVisible;
            }),
            e
          );
        })(r.ComponentInterface);
        e['default'] = s;
      },
      503: function(t, e, a) {
        'use strict';
        (e.__esModule = !0), (e['default'] = void 0);
        e['default'] = {
          'initial.group.column3d': function() {
            return {
              'zeroPlane.appearing': function() {
                return [
                  {
                    initialAttr: {opacity: 0},
                    finalAttr: {opacity: 1},
                    slot: 'axis',
                  },
                ];
              },
            };
          },
        };
      },
      504: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(492)),
          i = a(193),
          l = a(505),
          s = a(201),
          c = o(a(506));
        (0, s.addDep)({
          name: 'column3dAnimation',
          type: 'animationRule',
          extension: c['default'],
        });
        var u = (function(t) {
          function e() {
            var e;
            return (
              ((e = t.call(this) || this).setContainerVisibility = i.stubFN), e
            );
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'column3D';
            }),
            (a.__setDefaultConfig = function() {
              t.prototype.__setDefaultConfig.call(this),
                (this.config.use3dlighting = i.UNDEF);
            }),
            (a.createContainer = function() {
              var t = this.getLinkedParent(),
                e = this.getFromEnv('paper');
              !this.getContainer('labelGroup') &&
                this.addContainer(
                  'labelGroup',
                  (function(t, e, a) {
                    return e.group(t, a);
                  })(
                    'label-group',
                    e,
                    t.getChildContainer('vcanvasLabelGroup'),
                  ).attr('class', 'fusioncharts-datalabels'),
                ).attr('opacity', 1);
            }),
            (a._getHoveredPlot = function(t, e) {
              var a,
                o,
                n = this.getFromEnv('chart').isBar;
              return (
                (a = this.getFromEnv('xAxis').getValue(n ? e : t)),
                (o = Math.round(a)) - a > 0
                  ? l._checkPointerOverColumn.call(this, o, t, e) ||
                    l._checkPointerOverColumn.call(this, o - 1, t, e)
                  : l._checkPointerOverColumn.call(this, o + 1, t, e) ||
                    l._checkPointerOverColumn.call(this, o, t, e)
              );
            }),
            e
          );
        })(r['default']);
        e['default'] = u;
      },
      505: function(t, e, a) {
        'use strict';
        (e.__esModule = !0),
          (e._checkPointerOverColumn = function(t, e, a) {
            var n,
              r,
              i,
              l,
              s,
              c,
              u,
              d,
              f,
              h = this.getFromEnv('chart').config,
              p = h.plotborderthickness,
              g = h.showplotborder,
              v = this.components.data,
              m = v[t];
            if (!m) return;
            if (
              ((n = m.config.setValue),
              (s = (s = (p = g ? p : 0) / 2) % 2 == 0 ? s + 1 : o(s)),
              null !== n &&
                ((c = m._xPos - 10),
                (d = m._width + 10),
                (u = m._yPos),
                (f = m._height + 10),
                (i = a - u + s),
                (l =
                  !!(l =
                    !!(l =
                      (r = e - c + s) >= 0 &&
                      r <= d + p &&
                      i >= 0 &&
                      i <= f + p) && e + a - (c + u) - 10 > 0) &&
                  e + a - (c + u + d + f) + 10 < 0)))
            )
              return {pointIndex: t, hovered: l, pointObj: v[t]};
          });
        var o = Math.round;
      },
      506: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = {
          'initial.dataset.column3D': o(a(493))['default'][
            'initial.dataset.column'
          ],
        };
        e['default'] = n;
      },
      507: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(508))['default'];
        e['default'] = n;
      },
      508: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(416)),
          i = o(a(509)),
          l = a(193),
          s = l.preDefStr.SEVENTYSTRING,
          c = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.axisPaddingLeft = 0),
                (e.axisPaddingRight = 0),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Line';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Line';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Line Chart'),
                  (e.singleseries = !0),
                  (e.defaultDatasetType = 'line'),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = l.HUNDREDSTRING),
                  (e.anchorimagealpha = l.HUNDREDSTRING),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = s),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = l.HUNDREDSTRING),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0),
                  (e.zeroplanethickness = 1),
                  (e.enablemousetracking = !0),
                  (e.zeroplanealpha = 40),
                  (e.showzeroplaneontop = 0),
                  (e.defaultcrosslinethickness = 1);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      513: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(514))['default'];
        e['default'] = n;
      },
      514: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(416)),
          i = o(a(510)),
          l = a(193),
          s = l.preDefStr.SEVENTYSTRING,
          c = (function(t) {
            function e() {
              var e;
              return ((e = t.call(this) || this).defaultPlotShadow = 0), e;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Area2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Area2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Area Chart'),
                  (e.singleseries = !0),
                  (e.defaultDatasetType = 'area'),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = l.HUNDREDSTRING),
                  (e.anchorimagealpha = l.HUNDREDSTRING),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = s),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = l.HUNDREDSTRING),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.inheritplotbordercolor = 0),
                  (e.connectnulldata = 0),
                  (e.enablemousetracking = !0),
                  (e.defaultcrosslinethickness = 1);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      515: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(516))['default'];
        e['default'] = n;
      },
      516: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(517)),
          i = o(a(533)),
          l = (function(t) {
            function e() {
              var e;
              return ((e = t.call(this) || this).isBar = !0), e;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Bar2D';
              });
            var a = e.prototype;
            return (
              (a.getType = function() {
                return 'chartAPI';
              }),
              (a.getName = function() {
                return 'Bar2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this),
                  (this.config.friendlyName = 'Bar Chart'),
                  (this.config.singleseries = !0),
                  (this.config.defaultDatasetType = 'bar2d'),
                  (this.config.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {}),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      517: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(416)),
          i = a(518),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t);
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'SSBarCartesian';
              }),
              (e.getName = function() {
                return 'SSBarCartesian';
              }),
              (a._feedAxesRawData = function() {
                return i.__feedAxesRawData.call(this);
              }),
              (a._spaceManager = function() {
                i.__spaceManager.call(this);
              }),
              (a._postSpaceManagement = function() {
                i.__postSpaceManagement.call(this);
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      535: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(536))['default'];
        e['default'] = n;
      },
      536: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(537)),
          i = o(a(538)),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.fireGroupEvent = !0),
                (e.isBar = !0),
                (e.defaultZeroPlaneHighlighted = !1),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Bar3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Bar3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.singleseries = !0),
                  (e.friendlyName = '3D Bar Chart'),
                  (e.defaultDatasetType = 'bar3d'),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      537: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(496)),
          i = a(518),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).__feedAxesRawData =
                  i.__feedAxesRawData),
                (e.__spaceManager = i.__spaceManager),
                (e.__postSpaceManagement = i.__postSpaceManagement),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'SSBarCartesian3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'SSBarCartesian3D';
              }),
              (a._feedAxesRawData = function() {
                return i.__feedAxesRawData.call(this);
              }),
              (a._spaceManager = function() {
                i.__spaceManager.call(this);
              }),
              (a._postSpaceManagement = function() {
                i.__postSpaceManagement.call(this);
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      538: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(504)),
          i = a(533),
          l = a(201),
          s = o(a(539));
        (0, l.addDep)({
          name: 'bar3DAnimation',
          type: 'animationRule',
          extension: s['default'],
        });
        var c = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'bar3D';
            }),
            (a._checkPointerOverColumn = function(t, e, a) {
              var o,
                n,
                r,
                i,
                l,
                s,
                c,
                u = this.getFromEnv('chart').config,
                d = u.plotborderthickness,
                f = u.showplotborder,
                h = this.components.data,
                p = h[t];
              if (p)
                return (
                  (d = f ? d : 0),
                  null !== p.config.setValue &&
                  ((l = p._yPos),
                  (c = p._height + 5),
                  (i = p._xPos - 5),
                  (s = p._width + 5),
                  (n = a - l),
                  (r =
                    !!(r =
                      !!(r =
                        (o = e - i) >= 0 &&
                        o <= s + d &&
                        n >= 0 &&
                        n <= c + d) && e + a - (i + l) - 5 > 0) &&
                    e + a - (i + l + s + c) + 5 < 0))
                    ? {pointIndex: t, hovered: r, pointObj: h[t]}
                    : void 0
                );
            }),
            (a._getHoveredPlot = function(t, e) {
              var a,
                o,
                n = this.getFromEnv('chart').isBar;
              return (
                (a = this.getFromEnv('xAxis').getValue(n ? e : t)),
                (o = Math.round(a)) - a > 0
                  ? this._checkPointerOverColumn(o, t, e) ||
                    this._checkPointerOverColumn(o - 1, t, e)
                  : this._checkPointerOverColumn(o + 1, t, e) ||
                    this._checkPointerOverColumn(o, t, e)
              );
            }),
            (a.drawLabel = function() {
              var t = this.config;
              i.drawLabel.call(this, t.scrollMinVal, t.scrollMaxVal);
            }),
            e
          );
        })(r['default']);
        e['default'] = c;
      },
      539: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = {
          'initial.dataset.bar3D': o(a(534))['default'][
            'initial.dataset.bar2D'
          ],
        };
        e['default'] = n;
      },
      540: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(541))['default'];
        e['default'] = n;
      },
      541: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(542)),
          i = o(a(419)),
          l = a(193),
          s = o(a(424)),
          c = o(a(426)),
          u = o(a(428)),
          d = o(a(545)),
          f = o(a(522)),
          h = a(520),
          p = a(205),
          g = Math,
          v = g.min,
          m = g.max,
          b = g.abs,
          C = g.PI,
          D = g.round,
          _ = C / 180,
          y = 180 / C,
          S = 0,
          k = function(t, e, a) {
            var o,
              n,
              r,
              i,
              l = !!a,
              s = e;
            return t
              ? ((i = (o = (t.components && t.components.data) || [])[
                  (s = t.config.reversePlotOrder ? o.length - s - 1 : s)
                ]) &&
                  ((n = i.config),
                  (r =
                    l !== i.config.sliced || void 0 === a
                      ? t.plotGraphicClick.call(i.graphics.element)
                      : n.sliced)),
                r)
              : r;
          },
          x = (function(t) {
            (0, n['default'])(a, t),
              (a.getName = function() {
                return 'Pie2D';
              });
            var e = a.prototype;
            function a() {
              var e;
              return (
                ((e = t.call(this) || this).defaultSeriesType = 'pie'),
                (e.defaultPlotShadow = 1),
                (e.reverseLegend = 1),
                (e.defaultPaletteOptions = void 0),
                (e.sliceOnLegendClick = !0),
                (e.dontShowLegendByDefault = !0),
                (e.defaultZeroPlaneHighlighted = !1),
                (e.hasCanvas = !0),
                (e.eiMethods = {
                  isPlotItemSliced: function(t) {
                    var e,
                      a,
                      o = this.apiInstance,
                      n = o && o.getDatasets();
                    return (
                      n &&
                      (n = n[0]) &&
                      (e = n.components.data) &&
                      e[t] &&
                      (a = e[t].config) &&
                      a.sliced
                    );
                  },
                  addData: function() {
                    var t = this.apiInstance,
                      e = t && t.getDatasets();
                    return e && (e = e[0]) && e.addData.apply(e, arguments);
                  },
                  removeData: function() {
                    var t = this.apiInstance,
                      e = t && t.getDatasets();
                    return e && (e = e[0]) && e.removeData.apply(e, arguments);
                  },
                  updateData: function() {
                    var t = this.apiInstance,
                      e = t && t.getDatasets();
                    return e && (e = e[0]) && e.updateData.apply(e, arguments);
                  },
                  slicePlotItem: function(t, e, a) {
                    var o = this.apiInstance;
                    if (!a) return k(o.getDatasets()[0], t, e);
                    o.addJob(
                      'eiMethods-slice-plot' + S++,
                      function() {
                        var n = k(o.getDatasets()[0], t, e);
                        return 'function' == typeof a && a(n);
                      },
                      p.priorityList.postRender,
                    );
                  },
                  startingAngle: function(t, e, a) {
                    var o,
                      n = this.apiInstance;
                    if (!a) return n._startingAngle(t, e);
                    n.addJob(
                      'eiMethods-start-angle' + S++,
                      function() {
                        (o = n._startingAngle(t, e)),
                          'function' == typeof a && a(o);
                      },
                      p.priorityList.postRender,
                    );
                  },
                }),
                e.registerFactory('dataset', d['default'], [
                  'vCanvas',
                  'legend',
                ]),
                e.registerFactory('legend', f['default']),
                e
              );
            }
            return (
              (e.getName = function() {
                return 'Pie2D';
              }),
              (e.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.alignCaptionWithCanvas = 0),
                  (e.formatnumberscale = 1),
                  (e.isSingleSeries = !0),
                  (e.friendlyName = 'Pie Chart'),
                  (e.defaultDatasetType = 'Pie2D'),
                  (e.plotborderthickness = 1),
                  (e.decimals = 2),
                  (e.alphaanimation = 0),
                  (e.singletonPlaceValue = !0),
                  (e.usedataplotcolorforlabels = 0),
                  (e.enableslicing = l.ONESTRING),
                  (e.skipCanvasDrawing = !0);
              }),
              (e.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e);
                var a = this.getFromEnv('chart-attrib');
                (this.config.showLegend = (0, l.pluckNumber)(a.showlegend, 0)),
                  (this.config.showvalues = (0, l.pluckNumber)(
                    a.showvalues,
                    1,
                  )),
                  (this.config.showlabels = (0, l.pluckNumber)(
                    a.showlabels,
                    1,
                  ));
              }),
              (e.configureAttributes = function(t) {
                var e = this.config;
                this.parseChartAttr(t),
                  this.createComponent(t),
                  (this.config.skipConfigureIteration.axis = !0),
                  this.configureChildren(),
                  this.getFromEnv('toolTipController').setStyle({
                    backgroundColor: l.hasSVG
                      ? (0, l.convertColor)(
                          e.tooltipbgcolor || 'FFF',
                          e.tooltipbgalpha || 100,
                        )
                      : (e.tooltipbgcolor || 'FFF')
                          .replace(/\s+/g, '')
                          .replace(/^#?([a-f0-9]+)/gi, '#$1'),
                    color: (
                      e.tooltipcolor ||
                      e.basefontcolor ||
                      '545454'
                    ).replace(/^#?([a-f0-9]+)/gi, '#$1'),
                    borderColor: l.hasSVG
                      ? (0, l.convertColor)(
                          e.tooltipbordercolor || '666',
                          e.tooltipborderalpha || 100,
                        )
                      : (e.tooltipbordercolor || '666')
                          .replace(/\s+/g, '')
                          .replace(/^#?([a-f0-9]+)/gi, '#$1'),
                    borderWidth:
                      (0, l.pluckNumber)(e.tooltipborderthickness, 1) + 'px',
                    showToolTipShadow: (0, l.pluckNumber)(
                      e.showtooltipshadow || 0,
                    ),
                    borderRadius:
                      (0, l.pluckNumber)(e.tooltipborderradius, 0) + 'px',
                    fontSize: (0, l.pluckNumber)(e.basefontsize, 10) + 'px',
                    fontFamily:
                      e.basefont || this.getFromEnv('style').inCanfontFamily,
                    padding: (0, l.pluckNumber)(e.tooltippadding || 3) + 'px',
                  });
              }),
              (e.createComponent = function() {
                var t;
                (t = this.config.skipConfigureIteration = {}),
                  this.createBaseComponent(),
                  this.getFromEnv('animationManager').setAnimationState(
                    this._firstConfigure ? 'initial' : 'update',
                  ),
                  (0, l.componentFactory)(this, s['default'], 'caption'),
                  (t.caption = !0),
                  (0, l.componentFactory)(this, c['default'], 'subCaption'),
                  (t.subCaption = !0),
                  (0, l.componentFactory)(this, u['default'], 'background'),
                  (t.background = !0),
                  (t.canvas = !0),
                  this._createConfigurableComponents &&
                    this._createConfigurableComponents(),
                  this.config.realtimeEnabled &&
                    this._realTimeConfigure &&
                    this._realTimeConfigure();
              }),
              (e._postSpaceManagement = function() {
                this.config.showLegend &&
                  this.getChildren('legend') &&
                  this.getChildren('legend')[0].postSpaceManager(),
                  this.allocateDimensionOfChartMenuBar();
              }),
              (e._checkInvalidSpecificData = function() {
                var t,
                  e,
                  a,
                  o = 0,
                  n = 0,
                  r = this.getFromEnv('dataSource').data;
                if (!r) return !0;
                for (e = r.length || 0, t = 0; t < e; t++)
                  (a = Number(r[t].value)),
                    (o += isNaN(a) || 0 !== a ? 0 : 1),
                    (n += isNaN(a) ? 1 : 0);
                return o + n >= e;
              }),
              (e._spaceManager = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r,
                  i = this.config,
                  s = this.getChildren('dataset')[0],
                  c = s.components.data,
                  u = s.config,
                  d = this.getFromEnv('legend'),
                  f = this.getFromEnv('color-manager'),
                  h = this.getFromEnv('smartLabel'),
                  p = this.getFromEnv('chartWidth'),
                  g = this.getFromEnv('chartHeight'),
                  C = [],
                  D = u.dataLabelCounter,
                  _ = 0,
                  y = this.getFromEnv('dataSource').chart,
                  S = (0, l.pluckNumber)(y.managelabeloverflow, 0),
                  k = (0, l.pluckNumber)(y.slicingdistance),
                  x =
                    u.preSliced ||
                    i.allPlotSliceEnabled !== l.ZEROSTRING ||
                    (y.showlegend === l.ONESTRING &&
                      y.interactivelegend !== l.ZEROSTRING)
                      ? b((0, l.pluckNumber)(k, 20))
                      : 0,
                  A = /%/g.test(y.pieradius),
                  P = (0, l.pluckNumber)(
                    A
                      ? Math.min(p / 2, g / 2) * (parseFloat(y.pieradius) / 100)
                      : y.pieradius,
                    0,
                  ),
                  w = (0, l.pluckNumber)(
                    y.enablesmartlabels,
                    y.enablesmartlabel,
                    1,
                  ),
                  N = w
                    ? (0, l.pluckNumber)(
                        y.skipoverlaplabels,
                        y.skipoverlaplabel,
                        1,
                      )
                    : 0,
                  F = (0, l.pluckNumber)(y.issmartlineslanted, 1),
                  M = D
                    ? (0, l.pluckNumber)(
                        y.labeldistance,
                        y.smartlabelclearance,
                        5,
                      )
                    : x,
                  T = i.width,
                  B = i.height,
                  L = (this._manageActionBarSpace(0.225 * B) || {}).bottom,
                  I = T - (i.marginRight + i.marginLeft),
                  E =
                    B -
                    (i.marginTop + i.marginBottom) -
                    (L ? L + i.marginBottom : 0),
                  O = v(E, I),
                  R = (0, l.pluck)(
                    y.smartlinecolor,
                    f.getColor('plotFillColor'),
                  ),
                  G = (0, l.pluckNumber)(y.smartlinealpha, 100),
                  V = (0, l.pluckNumber)(y.smartlinethickness, 0.7),
                  z = (u.dataLabelOptions = s._parseDataLabelOptions()),
                  H = z.style,
                  W = D
                    ? (0, l.pluckNumber)(parseInt(H.lineHeight, 10), 12)
                    : 0,
                  Y = 0 === P ? 0.15 * O : P,
                  U = 2 * Y,
                  j = u.pieYScale,
                  X = u.pieSliceDepth,
                  Z = (0, l.pluck)(y.legendposition, l.POSITION_BOTTOM)
                    .toLowerCase()
                    .split('-');
                if (
                  ((z.connectorWidth = V),
                  (z.connectorPadding = (0, l.pluckNumber)(
                    y.connectorpadding,
                    5,
                  )),
                  (z.connectorColor = (0, l.convertColor)(R, G)),
                  (r =
                    U +
                    2 *
                      (W +
                        (t =
                          (i.showvalues || i.showlabels) &&
                          ('inside' !== u.labelPosition ||
                            'inside' !== u.valuePosition)
                            ? M + x
                            : M))),
                  (E -=
                    ((a = this._manageChartMenuBar(r < E ? E - r : E / 2))
                      .top || 0) + (a.bottom || 0)),
                  u.showLegend &&
                    ((this.config.hasLegend = !0),
                    Z[0] === l.POSITION_RIGHT || Z[0] === l.POSITION_LEFT
                      ? ((e = d._manageLegendPosition(E / 2)),
                        (I -= m(e.left, e.right)))
                      : ((e = d._manageLegendPosition(E / 2)),
                        (E -= m(e.top, e.bottom))),
                    e && this._allocateSpace(e)),
                  h.useEllipsesOnOverflow(i.useEllipsesWhenOverflow),
                  1 !== D)
                )
                  for (; D--; )
                    h.setStyle(c[D].config.style || i.dataLabelStyle),
                      (C[D] = o = h.getOriSize(c[D].config.displayValue)),
                      (_ =
                        'inside' !== u.labelPosition ||
                        'inside' !== u.valuePosition
                          ? m(_, o.width)
                          : 0);
                0 === P
                  ? (Y = this._stubRadius(I, _, E, t, x, W, Y, M))
                  : ((u.slicingDistance = x),
                    (u.pieMinRadius = Y),
                    (z.distance = M)),
                  (n = E - 2 * (Y * j + W)),
                  (u.managedPieSliceDepth = X > n ? X - n : u.pieSliceDepth),
                  (z.isSmartLineSlanted = F),
                  (z.enableSmartLabels = w),
                  (z.skipOverlapLabels = N),
                  (z.manageLabelOverflow = S);
              }),
              (e._stubRadius = function(t, e, a, o, n, r, i, s) {
                var c,
                  u = i,
                  d = n,
                  f = this.getChildren('dataset')[0],
                  h = f.config,
                  p = this.getFromEnv('dataSource').chart,
                  g = (0, l.pluckNumber)(p.slicingdistance),
                  b =
                    h.dataLabelOptions ||
                    (h.dataLabelOptions = f._parseDataLabelOptions());
                return (
                  (c = v(t / 2 - e - d, a / 2 - r) - o) >= u
                    ? (u = c)
                    : g || (d = m(v(o - (u - c), d), 10)),
                  (h.slicingDistance = d),
                  (h.pieMinRadius = u),
                  (b.distance = s),
                  u
                );
              }),
              (e._startingAngle = function(t, e) {
                var a,
                  o = t,
                  n = this.getChildren('dataset')[0],
                  r = n.config,
                  i = (a = r.startAngle) * -y + (-1 * a < 0 ? 360 : 0);
                return (
                  isNaN(o) ||
                    r.singletonCase ||
                    r.isRotating ||
                    ((o += e ? i : 0),
                    (r.startAngle = -o * _),
                    n._rotate(o),
                    (i = o)),
                  D(100 * ((i %= 360) + (i < 0 ? 360 : 0))) / 100
                );
              }),
              (e._manageLegendSpace = function() {
                h._manageLegendSpace.call(this);
              }),
              (e.getDSdef = function() {
                return r['default'];
              }),
              a
            );
          })(i['default']);
        e['default'] = x;
      },
      545: function(t, e, a) {
        'use strict';
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              n = t.getFromEnv('dataSource'),
              r = n.dataset,
              i = n.data || (r && r[0].data);
            if (
              ((a = (function(t) {
                var e = [];
                return (
                  (0, o.fcEach)(t, function(t) {
                    'true' !== t.vline &&
                      !0 !== t.vline &&
                      1 !== t.vline &&
                      '1' !== t.vline &&
                      e.push(t);
                  }),
                  {catData: [], data: e}
                );
              })(i)),
              !(i && 0 !== i.length))
            )
              return void t.setChartMessage();
            (e = t.getDSdef()), (0, o.datasetFactory)(t, e, 'dataset', 1, [a]);
          });
        var o = a(193);
      },
      546: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(547))['default'];
        e['default'] = n;
      },
      547: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(541)),
          i = o(a(548)),
          l = a(193),
          s = Math,
          c = s.round,
          u = s.min,
          d = s.max,
          f = s.PI,
          h = (function(t) {
            function e() {
              var e;
              return ((e = t.call(this) || this).defaultPlotShadow = 0), e;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Pie3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Pie3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = '3D Pie Chart'),
                  (e.defaultDatasetType = 'Pie3D'),
                  (e.plotborderthickness = 0.1),
                  (e.alphaanimation = 1);
              }),
              (a.animate = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r,
                  i,
                  l,
                  s = this.components.dataset[0],
                  c = s.config,
                  u = s.components.data,
                  d = u.length,
                  h = c.alphaAnimation,
                  p = this.get('config', 'animationObj'),
                  g = p.duration || 0,
                  v = p.dummyObj,
                  m = p.animObj,
                  b = p.animType;
                if (!h)
                  for (t = 0; t < d; t++)
                    (a = (e = u[t]).graphics),
                      (n = e.config.shapeArgs),
                      (r = 2 * f),
                      (o = a.element) &&
                        (o.attr({sAngle: r, eAngle: r}),
                        (i = n.sAngle),
                        (l = n.eAngle),
                        (void 0).animateWith(
                          v,
                          m,
                          {cx: i - r, cy: l - r},
                          g,
                          b,
                        ));
              }),
              (a._stubRadius = function(t, e, a, o, n, r, i) {
                var s,
                  c = a,
                  f = i,
                  h = n,
                  p = o,
                  g = this.getChildren('dataset')[0],
                  v = g.config,
                  m = g.config,
                  b = (0, l.pluckNumber)(m.slicingdistance),
                  C =
                    v.dataLabelOptions ||
                    (v.dataLabelOptions = g._parseDataLabelOptions()),
                  D = v.pieYScale,
                  _ = v.pieSliceDepth;
                return (
                  (s = u(t / 2 - e - h, ((c -= _) / 2 - r) / D) - p) >= f
                    ? (f = s)
                    : b || (h = p = d(u(p - (f - s), h), 10)),
                  (v.slicingDistance = h),
                  (v.pieMinRadius = f),
                  (C.distance = p),
                  f
                );
              }),
              (a._startingAngle = function(t, e) {
                var a,
                  o = t,
                  n = this.getChildren('dataset')[0],
                  r = n.config,
                  i = (a = r.startAngle) + (a < 0 ? 360 : 0);
                return (
                  isNaN(o) ||
                    r.singletonCase ||
                    r.isRotating ||
                    ((o += e ? i : 0), n._rotate(o), (i = o)),
                  c(100 * ((i %= 360) + (i < 0 ? 360 : 0))) / 100
                );
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = h;
      },
      548: function(t, e, a) {
        'use strict';
        var o = a(191),
          n = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var r,
          i = n(a(210)),
          l = n(a(207)),
          s = o(a(542)),
          c = a(193),
          u = a(208),
          d = a(549),
          f = n(a(551)),
          h = a(201),
          p = n(a(552)),
          g = (0, h.getDep)('redraphael', 'plugin'),
          v = window,
          m = 8 === window.document.documentMode ? 'visible' : '',
          b = c.preDefStr.elementStr,
          C = 'M',
          D = 'L',
          _ = 'v',
          y = 'A',
          S = 'Z',
          k = Math,
          x = k.max,
          A = k.min,
          P = k.abs,
          w = k.ceil,
          N = k.sin,
          F = k.atan2,
          M = k.cos,
          T = k.floor,
          B = k.round,
          L = k.PI,
          I = 2 * L,
          E = L / 2,
          O = L + E,
          R = function(t, e) {
            for (var a = [], o = 0, n = t.length; o < n; o++)
              a[o] = e.call(t[o], t[o], o, t);
            return a;
          },
          G = function(t) {
            return 'string' == typeof t;
          },
          V = function(t, e) {
            return parseInt(t, e || 10);
          },
          z = {lighting3D: {}, lighting2D: {}},
          H = function(t, e, a, o, n) {
            return F((e - a[1] - o.top) / n, t - a[0] - o.left);
          },
          W = function(t) {
            var e = this.data('plotItem'),
              a = e.index,
              o = e.chart,
              n = o.getFromEnv('animationManager'),
              r = o.config,
              i = o.getChildren('dataset')[0],
              l = i.config,
              s = i.components.data[a],
              c = s.graphics,
              u = s.config,
              d = c.element,
              f = u.hoverEffects;
            l.isRotating ||
              (o.plotEventHandler(d, t, 'DataPlotRollOver'),
              f.enabled && n.setAnimation({el: d, attr: f, component: i})),
              (r.isHovered = !0);
          },
          Y = function(t) {
            var e,
              a,
              o = this.data('plotItem'),
              n = o.index,
              r = o.chart,
              i = r.getFromEnv('animationManager'),
              l = r.config,
              s = r.getChildren('dataset')[0],
              c = s.config,
              u = s.components.data[n];
            u &&
              ((e = u.config),
              (a = u.graphics.element),
              c.isRotating ||
                (r.plotEventHandler(a, t, 'DataPlotRollOut'),
                i.setAnimation({
                  el: a,
                  attr: {
                    color: e.color.color.split(',')[0],
                    alpha: e._3dAlpha,
                    borderWidth: e.borderWidth,
                    borderColor: e.borderColor,
                  },
                  component: s,
                })),
              (l.isHovered = !1));
          },
          U = function(t) {
            var e,
              a = this.data('plotItem').chart.getChildren('dataset')[0],
              o = (0, c.pluckNumber)(t.button, t.originalEvent.button),
              n = a.config,
              r = t.data[0],
              i = t.data[1];
            (n.isRightClicked = !(c.touchEnabled || 0 === o || 1 === o)),
              n.enableRotation &&
                !n.isRightClicked &&
                ((n.isRotating = !1),
                (e = H.call(
                  t,
                  r,
                  i,
                  n.center,
                  (n.chartPosition = (0, c.getPosition)(
                    a.getFromEnv('chart-container'),
                  )),
                  n.pieYScale,
                )),
                (n.dragStartAngle = e),
                (n._lastAngle = -n.startAngle),
                (n.startingAngleOnDragStart = n.startAngle));
          },
          j = function() {
            var t = this.data('plotItem'),
              e = t.index,
              a = t.chart,
              o = a.getFromEnv('animationManager'),
              n = a.config,
              r = a.getChildren('dataset')[0],
              i = r.config,
              l = r.components.data[e],
              s = l.graphics,
              u = l.config,
              d = s.element,
              f = i.startAngle;
            i.isRightClicked ||
              (i.isRotating &&
                (setTimeout(function() {
                  i.isRotating = !1;
                }, 0),
                a.fireChartInstanceEvent('rotationEnd', {
                  startingAngle: (0, c.normalizeAngle)(f, !0),
                  changeInAngle: f - i.startingAngleOnDragStart,
                }),
                !n.isHovered &&
                  o.setAnimation({
                    el: d,
                    attr: {
                      color: u.color.color.split(',')[0],
                      alpha: u._3dAlpha,
                      borderWidth: u.borderWidth,
                      borderColor: u.borderColor,
                    },
                    component: r,
                  })));
          },
          X = function(t) {
            var e,
              a,
              o,
              n = this.data('plotItem').chart,
              r = t.data,
              i = r[0],
              l = r[1],
              s = r[2],
              u = r[3],
              d = n.getChildren('dataset')[0],
              f = d.config;
            isNaN(i) ||
              isNaN(l) ||
              !f.enableRotation ||
              f.singletonCase ||
              f.isRightClicked ||
              ((e = H.call(t, s, u, f.center, f.chartPosition, f.pieYScale)),
              f.dragStartAngle === e ||
                f.isRotating ||
                ((f.isRotating = !0),
                n.fireChartInstanceEvent('rotationStart', {
                  startingAngle: (0, c.normalizeAngle)(f.startAngle, !0),
                })),
              (o = e - f.dragStartAngle),
              (f.dragStartAngle = e),
              (f.moveDuration = 0),
              (f._lastAngle += (180 * o) / L),
              (a = new Date().getTime()),
              (!f._lastTime || f._lastTime + f.timerThreshold < a) &&
                (f._lastTime || d._rotate(),
                (f.timerId = setTimeout(function() {
                  (n.disposed && n.disposing) || d._rotate();
                }, f.timerThreshold)),
                (f._lastTime = a)));
          },
          Z = function(t, e) {
            return (
              t._conf.index - e._conf.index ||
              t._conf.cIndex - e._conf.cIndex ||
              t._conf.isStart - e._conf.isStart ||
              t._conf.si - e._conf.si
            );
          },
          J = function(t, e) {
            return t.point.value - e.point.value;
          },
          q = function(t, e) {
            return t.angle - e.angle;
          },
          K = ['start', 'start', 'end', 'end'],
          $ = [-1, 1, 1, -1],
          Q = [1, 1, -1, -1],
          tt = {
            stroke: !0,
            strokeWidth: !0,
            'stroke-width': !0,
            dashstyle: !0,
            'stroke-dasharray': !0,
            translateX: !0,
            translateY: !0,
            'stroke-opacity': !0,
            fill: !0,
            'fill-opacity': !0,
            opacity: !0,
            transform: !0,
            cursor: !0,
            sAngle: !0,
            eAngle: !0,
            color: !0,
            alpha: !0,
            borderColor: !0,
            borderAlpha: !0,
            borderWidth: !0,
            rolloverProps: !0,
            showBorderEffect: !0,
            positionIndex: !0,
            cx: !0,
            cy: !0,
            radiusYFactor: !0,
            r: !0,
            innerR: !0,
          },
          et = function(t, e) {
            var a,
              o,
              n,
              i,
              l,
              s,
              c,
              u = t,
              d = this,
              f = d._confObject,
              h = {},
              p = f.elements,
              g = f.Pie3DManager;
            if (
              (G(u) &&
                ((c = e) !== r && null !== c) &&
                ((a = u), ((u = {})[a] = e)),
              !u || G(u))
            )
              d = tt[u] ? f[u] : d._attr(u);
            else {
              for (a in u)
                (o = u[a]),
                  tt[a]
                    ? ((f[a] = o),
                      'cursor' === a ||
                      'transform' === a ||
                      'opacity' === a ||
                      'fill-opacity' === a
                        ? ((h[a] = o), (s = !0))
                        : 'sAngle' === a ||
                          'eAngle' === a ||
                          'cx' === a ||
                          'cy' === a ||
                          'radiusYFactor' === a ||
                          'r' === a ||
                          'innerR' === a
                        ? (i = !0)
                        : ('color' !== a &&
                            'alpha' !== a &&
                            'borderColor' !== a &&
                            'borderAlpha' !== a &&
                            'borderWidth' !== a) ||
                          (l = !0))
                    : d._attr(a, o);
              if (
                (i && (g._setSliceShape(f), g.refreshDrawing()),
                (l || i) && g._setSliceCosmetics(f),
                s)
              ) {
                for (n in p) p[n].attr(h);
                d._attr(h);
              }
            }
            return d;
          },
          at = function(t, e, a) {
            if (!a) {
              var o,
                n = this._confObject.elements;
              for (o in n) n[o].on(t, e);
              return this._on(t, e);
            }
            this._on(t, e, !0);
          },
          ot = function(t, e, a) {
            var o,
              n = this._confObject.elements,
              r = v.navigator.userAgent.toLowerCase().indexOf('android') > -1;
            for (o in n)
              (r &&
                'topBorder' !== o &&
                'frontOuter' !== o &&
                'startSlice' !== o &&
                'endSlice' !== o) ||
                n[o].drag(t, e, a);
            return this._drag(t, e, a);
          },
          nt = function() {
            var t,
              e = this._confObject.elements;
            for (t in e) e[t].hide();
            return this._hide();
          },
          rt = function() {
            var t,
              e = this._confObject.elements;
            for (t in e) e[t].show();
            return this._show();
          },
          it = function() {
            var t,
              e = this._confObject,
              a = e.elements;
            for (t in a) a[t].destroy();
            return (
              c.hasSVG &&
                (e.clipTop.destroy(),
                e.clipOuterFront.destroy(),
                e.clipOuterBack.destroy(),
                e.clipOuterFront1 && e.clipOuterFront1.destroy(),
                e.clipInnerFront && e.clipInnerFront.destroy(),
                e.clipInnerBack && e.clipInnerBack.destroy()),
              this._destroy()
            );
          },
          lt = function(t, e) {
            var a,
              o = this._confObject.elements;
            if (e === r) return this._data(t);
            for (a in o) o[a].data(t, e);
            return this._data(t, e);
          },
          st = 0;
        (0, h.addDep)({
          name: 'pie3dAnimation',
          type: 'animationRule',
          extension: f['default'],
        });
        var ct = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, l['default'])(e, t);
          var a = e.prototype;
          return (
            (a.__setDefaultConfig = function() {
              t.prototype.__setDefaultConfig.call(this);
              var e = this.config;
              (e.setBorderWidth = r),
                (e.alphaanimation = 1),
                (e.showBorderEffect = r);
            }),
            (a.placeDataLabels = function(t) {
              var e,
                a,
                o,
                n,
                i,
                l,
                u,
                d,
                f,
                h,
                p,
                g,
                v,
                b,
                _,
                y,
                S,
                F,
                T,
                R,
                G,
                V,
                z,
                H,
                Z,
                tt,
                et,
                at,
                ot,
                nt,
                rt,
                it,
                lt,
                st,
                ct,
                ut,
                dt,
                ft = this,
                ht = ft.getFromEnv('chart'),
                pt = ht.getFromEnv('toolTipController'),
                gt = ht.config,
                vt = ft.config,
                mt = ft.components.data,
                bt = vt.piePlotOptions,
                Ct = gt.canvasLeft,
                Dt = gt.canvasTop,
                _t = gt.canvasWidth,
                yt = Ct + 0.5 * gt.canvasWidth,
                St = Dt + 0.5 * gt.canvasHeight,
                kt = ht.getFromEnv('smartLabel'),
                xt = vt.dataLabelOptions,
                At = xt.style,
                Pt = (0, c.pluckNumber)(w(parseFloat(At.lineHeight)), 12),
                wt = (0, c.getFirstValue)(xt.placeInside, !1),
                Nt = xt.skipOverlapLabels,
                Ft = xt.manageLabelOverflow,
                Mt = xt.connectorPadding,
                Tt = xt.distance,
                Bt = xt.connectorWidth,
                Lt = [[], [], [], []],
                It = Ct,
                Et = Dt,
                Ot = _t,
                Rt = parseInt(At.fontSize, 10),
                Gt = Rt,
                Vt = Gt / 2,
                zt = [Mt, Mt, -Mt, -Mt],
                Ht = xt.isSmartLineSlanted,
                Wt = Tt > 0,
                Yt =
                  vt.center ||
                  (vt.center = [yt, St, bt.size, bt.innerSize || 0]),
                Ut = Yt[1],
                jt = Yt[0],
                Xt = Yt[2],
                Zt = Yt[4],
                Jt = vt.labelsRadius,
                qt = B(100 * vt.labelsRadiusY) / 100,
                Kt = vt.maxLabels,
                $t = vt.enableSmartLabels,
                Qt = vt.pieSliceDepth / 2,
                te = ht.getFromEnv('animationManager'),
                ee = ft.getContainer('label-group');
              if (
                (kt.useEllipsesOnOverflow(gt.useEllipsesWhenOverflow),
                vt.dataLabelCounter)
              )
                if ((t || kt.setStyle(At), 1 === mt.length))
                  (G = mt[0]),
                    (rt = G.graphics),
                    (nt = G.config),
                    (dt = nt._textAttrs),
                    (ut = nt._textCss),
                    (Z = rt.label),
                    (it = rt.connector),
                    (nt.slicedTranslation = [It, Et]),
                    null !== nt.y &&
                      nt.y !== r &&
                      ((dt.visibility = m),
                      (dt['text-anchor'] = 'middle'),
                      (dt.x = jt),
                      (dt.y = Ut + Vt - 2),
                      (dt._x = jt)),
                    (ut.cursor = nt.labellink ? 'pointer' : ''),
                    (Z = rt.label = te.setAnimation({
                      el: rt.label || 'text',
                      attr: dt,
                      css: ut,
                      label: 'label',
                      container: ee,
                      component: ft,
                    }))
                      .on('fc-dragstart', U)
                      .on('fc-dragmove', X)
                      .on('fc-dragend', j)
                      .on(
                        'fc-click',
                        s.labelClickFn.bind(Z, ht, G.config.labellink),
                      )
                      .on('fc-mouseup', (0, s.plotClickHandler)(ft, Z))
                      .on('fc-mouseover', W)
                      .on('fc-mouseout', Y),
                    dt._x && ((Z.x = dt._x), delete dt.x),
                    Z.data('plotItem', dt.plotItem).data(
                      'eventArgs',
                      dt.eventArgs,
                    ),
                    dt.visibility === m && Z.show(),
                    it && it.hide();
                else if (wt)
                  (0, c.fcEach)(mt, function(t) {
                    var e, a, o;
                    (rt = t.graphics),
                      (nt = t.config),
                      (dt = nt._textAttrs),
                      (Z = rt.label),
                      null !== nt.y &&
                        nt.y !== r &&
                        ((V = nt.angle),
                        (T = Ut + Yt[6] * N(V) + Vt - 2),
                        (_ = jt + Yt[5] * M(V)),
                        (dt._x = _),
                        (dt._y = T),
                        nt.sliced &&
                          ((a = (e = t.slicedTranslation)[0] - It),
                          (o = e[1] - Et),
                          (_ += a),
                          (T += o)),
                        (dt.visibility = m),
                        (dt.align = 'middle'),
                        (dt.x = _),
                        (dt.y = T)),
                      (ut.cursor = nt.labellink ? 'pointer' : ''),
                      (Z = rt.label = te.setAnimation({
                        el: rt.label || 'text',
                        attr: dt,
                        css: ut,
                        label: 'label',
                        container: ee,
                        component: ft,
                      }))
                        .data('plotItem', dt.plotItem)
                        .data('eventArgs', dt.eventArgs),
                      dt.visibility === m && Z.show(),
                      (Z.x = dt._x),
                      (Z._x = dt._x),
                      (Z._y = dt._y);
                  });
                else {
                  for (
                    (0, c.fcEach)(mt, function(t) {
                      if (
                        ((rt = t.graphics),
                        (nt = t.config),
                        (ut = nt._textCss),
                        !((dt = nt._textAttrs).text = nt.displayValue))
                      )
                        return (
                          rt.connector &&
                            te.setAnimation({
                              el: rt.connector,
                              component: ft,
                              callback: s.hideFn,
                            }),
                          void (
                            rt.label &&
                            te.setAnimation({
                              el: rt.label,
                              component: ft,
                              callback: s.hideFn,
                            })
                          )
                        );
                      (rt = t.graphics),
                        null !== nt.y &&
                          nt.y !== r &&
                          ((Z = rt.label),
                          (it = rt.connector) && it.show(),
                          Z && Z.show()),
                        (Z = rt.label),
                        (V = nt.angle) < 0 && (V = I + V),
                        Lt[
                          V >= 0 && V < E ? 1 : V < L ? 2 : V < O ? 3 : 0
                        ].push({point: t, angle: V});
                    }),
                      n = 4;
                    n--;

                  ) {
                    if (Nt && (z = Lt[n].length - Kt) > 0)
                      for (
                        Lt[n].sort(J),
                          l = 0,
                          h = (H = Lt[n].splice(0, z)).length;
                        l < h;
                        l += 1
                      )
                        (G = H[l].point),
                          (rt = G.graphics).label &&
                            te.setAnimation({
                              el: rt.label,
                              attr: {visibility: 'hidden'},
                              component: ft,
                            }),
                          rt.connector &&
                            te.setAnimation({
                              el: rt.connector,
                              attr: {visibility: 'hidden'},
                              component: ft,
                            });
                    Lt[n].sort(q);
                  }
                  for (
                    ct = x(
                      Lt[0].length,
                      Lt[1].length,
                      Lt[2].length,
                      Lt[3].length,
                    ),
                      st = x(A(ct, Kt) * Gt, qt + Gt),
                      Lt[1].reverse(),
                      Lt[3].reverse(),
                      kt.setStyle(At),
                      p = 4;
                    p--;

                  ) {
                    for (
                      h = (R = Lt[p]).length,
                        Nt || (Vt = (Gt = h > Kt ? st / h : Rt) / 2),
                        f = h * Gt,
                        a = st,
                        n = 0;
                      n < h;
                      n += 1, f -= Gt
                    )
                      a < (u = P(st * N(R[n].angle)))
                        ? (u = a)
                        : u < f && (u = f),
                        (a = (R[n].oriY = u) - Gt);
                    for (
                      o = K[p], d = st - (h - 1) * Gt, a = 0, n = R.length - 1;
                      n >= 0;
                      n -= 1, d += Gt
                    )
                      (G = R[n].point),
                        (rt = G.graphics),
                        (nt = G.config),
                        (dt = nt._textAttrs),
                        (ut = nt._textCss),
                        null !== nt.y &&
                          dt.text &&
                          ((V = R[n].angle),
                          (g = nt.sliced),
                          (Z = rt.label),
                          (u = P(st * N(V))) < a ? (u = a) : u > d && (u = d),
                          (a = u + Gt),
                          (S = (u + R[n].oriY) / 2),
                          (v = jt + Q[p] * Jt * M(k.asin(S / st))),
                          (S *= $[p]),
                          (S += Ut),
                          (F = Ut + Zt * N(V)),
                          (b = jt + Xt * M(V)),
                          ((p < 2 && v < b) || (p > 1 && v > b)) && (v = b),
                          (T = S + Vt - 2),
                          (y = (_ = v + zt[p]) + zt[p]),
                          (dt._x = y),
                          Ft &&
                            ((i = p > 1 ? y - Ct : Ct + Ot - y),
                            kt.setStyle(nt.style),
                            (Pt =
                              (0, c.pluckNumber)(
                                w(parseFloat(nt.style.lineHeight)),
                                12,
                              ) +
                              (2 * w(parseFloat(nt.style.border), 12) || 0)),
                            (ot = kt.getSmartText(nt.displayValue, i, Pt)),
                            (dt.text = ot.text),
                            (dt.tooltip = ot.tooltext)),
                          V < L && ((S += Qt), (F += Qt), (T += Qt)),
                          (dt._y = T),
                          g &&
                            ((et = nt.transX),
                            (at = nt.transY),
                            (_ += et),
                            (v += et),
                            (b += et),
                            (S += at),
                            (F += at),
                            (y += et)),
                          (dt.visibility = m),
                          (dt['text-anchor'] = o),
                          (dt.x = y),
                          (dt.y = S),
                          (dt.opacity = 1),
                          (ut.cursor = nt.labellink ? 'pointer' : ''),
                          (tt = rt.label),
                          (Z = te.setAnimation({
                            el: tt || 'text',
                            attr: dt,
                            css: ut,
                            container: ee,
                            component: ft,
                            label: 'label',
                          })).outlineText(vt.showTextOutline, dt.fill),
                          Z.data('textPos', {x: y, y: S})
                            .data('plotItem', dt.plotItem)
                            .data('eventArgs', dt.eventArgs),
                          tt ||
                            ((rt.label = Z),
                            Z.on('fc-dragstart', U)
                              .on('fc-dragmove', X)
                              .on('fc-dragend', j)
                              .on(
                                'fc-click',
                                s.labelClickFn.bind(Z, ht, G.config.labellink),
                              )
                              .on('fc-click', (0, s.plotClickHandler)(ft, Z))
                              .on('fc-mouseover', W)
                              .on('fc-mouseout', Y)),
                          (Z.x = dt._x),
                          (Z._x = dt._x),
                          (Z.y = dt._y),
                          dt.tooltip &&
                            (pt.enableToolTip(Z, dt.tooltip),
                            delete dt.tooltip),
                          Wt &&
                            Bt &&
                            $t &&
                            ((it = rt.connector),
                            (nt.connectorPath = lt = [
                              C,
                              b,
                              F,
                              D,
                              Ht ? v : b,
                              S,
                              _,
                              S,
                            ]),
                            (e = {
                              path: lt,
                              'stroke-width': Bt,
                              stroke: xt.connectorColor || '#606060',
                              opacity: 1,
                              visibility: m,
                            }),
                            it &&
                              te.setAnimation({
                                el: it,
                                attr: e,
                                label: 'connector',
                                component: ft,
                              })));
                  }
                }
            }),
            (a._parsePie3DOptions = function() {
              var t = this.config;
              return {
                size: 2 * t.pieMinRadius,
                slicedOffset: t.slicingDistance,
                allowPointSelect: !0,
                cursor: 'pointer',
                innerSize:
                  'pie3d' === this.getName() ? 0 : d._getInnerSize.call(this),
              };
            }),
            (a._parseBorderConfig = function(t, e, a) {
              var o = this.config.pieBorderColor,
                n = this.getFromEnv('chart-attrib'),
                r = (0, c.pluck)(a.bordercolor, o),
                i = (0, c.pluck)(
                  a.borderalpha,
                  n.plotborderalpha,
                  n.pieborderalpha,
                );
              return {
                setPlotBorderColor: (r = (0, c.pluck)(
                  r,
                  (0, c.getLightColor)(t, 90),
                ).split(',')[0]),
                setPlotBorderAlpha: (i =
                  n.showplotborder === c.ZEROSTRING
                    ? c.ZEROSTRING
                    : (0, c.pluck)(i, e, '80')),
              };
            }),
            (a._initPie3dManager = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                l,
                s,
                u,
                d,
                f = this.getFromEnv('chart'),
                h = f.config,
                p = 0,
                g = this.config,
                v = this.components,
                m = g.dataLabelOptions,
                b = (g.pie3DOptions = this._parsePie3DOptions()),
                C = (0, c.pluck)(g.startAngle, 0) % I,
                D = g.managedPieSliceDepth,
                _ = (g.slicedOffset = b.slicedOffset),
                y = h.canvasWidth,
                S = h.canvasHeight,
                x = [h.canvasLeft + 0.5 * y, h.canvasTop + 0.5 * S - 0.5 * D],
                P = v.data,
                w = A(y, S),
                F = m.distance,
                L = g.pieYScale,
                E = g.slicedOffsetY || (g.slicedOffsetY = _ * g.pieYScale),
                O = this.getFromEnv('pie3DManager');
              for (
                x.push(2 * g.pieMinRadius, b.innerSize || 0),
                  (x = R(x, function(t, e) {
                    return /%$/.test(t)
                      ? ([y, S - D, w, w][e] * V(t)) / 100
                      : t;
                  }))[2] /= 2,
                  x[3] /= 2,
                  x.push(x[2] * L),
                  x.push((x[2] + x[3]) / 2),
                  x.push(x[5] * L),
                  this.getX = function(t, e) {
                    return (
                      (r = k.asin((t - x[1]) / (x[2] + F))),
                      x[0] + (e ? -1 : 1) * (M(r) * (x[2] + F))
                    );
                  },
                  g.center = x,
                  (0, c.fcEach)(P, function(t) {
                    p += t.config.y;
                  }),
                  g.labelsRadius = x[2] + F,
                  g.labelsRadiusY = g.labelsRadius * L,
                  g.quadrantHeight = (S - D) / 2,
                  g.quadrantWidth = y / 2,
                  l = (i = B(1e3 * (i = C)) / 1e3) + I,
                  e =
                    (0, c.pluckNumber)(parseInt(m.style.fontSize, 10), 10) + 4,
                  g.maxLabels = T(g.quadrantHeight / e),
                  g.labelFontSize = e,
                  g.connectorPadding = (0, c.pluckNumber)(
                    m.connectorPadding,
                    5,
                  ),
                  g.isSmartLineSlanted = (0, c.pluck)(m.isSmartLineSlanted, !0),
                  g.connectorWidth = (0, c.pluckNumber)(m.connectorWidth, 1),
                  g.enableSmartLabels = m.enableSmartLabels,
                  O ||
                    ((O = new ut(f)),
                    this.attachChild(O, 'pie3DManager', !1),
                    this.addToEnv('pie3DManager', O)),
                  this._configurePie3DManager(),
                  t = P.length - 1;
                t >= 0;
                t -= 1
              )
                (o = P[t].config),
                  (a = i),
                  (s = p ? o.y / p : 0),
                  (i = B(1e3 * (i + s * I)) / 1e3) > l && (i = l),
                  (n = i),
                  (o.shapeArgs = {
                    sAngle: B(1e3 * a) / 1e3,
                    eAngle: B(1e3 * n) / 1e3,
                  }),
                  (o.centerAngle = r = ((n + a) / 2) % I),
                  (o.slicedTranslation = [B(M(r) * _), B(N(r) * E)]),
                  (u = M(r) * x[2]),
                  (g.radiusY = d = N(r) * x[4]),
                  (o.tooltipPos = [x[0] + 0.7 * u, x[1] + d]),
                  (o.percentage = 100 * s),
                  (o.total = p);
            }),
            (a._configurePie3DManager = function() {
              var t = this.config,
                e = this.components,
                a = this.getFromEnv('pie3DManager'),
                o = e.data;
              a &&
                a.configure(
                  t.pieSliceDepth,
                  1 === o.length,
                  t.use3DLighting,
                  !1,
                );
            }),
            (a.allocatePosition = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                l = this.getFromEnv('chart').config,
                s = this.config,
                u = this.components.data,
                d = (0, c.pluck)(s.startAngle, 0) % I,
                f = (s.pie3DOptions = this._parsePie3DOptions()),
                h = s.pieYScale,
                p = s.managedPieSliceDepth,
                g = l.canvasWidth,
                v = l.canvasHeight,
                m = A(g, v),
                b = [l.canvasLeft + 0.5 * g, l.canvasTop + 0.5 * v - 0.5 * p],
                C = 0,
                D = u.length;
              for (
                b.push(2 * s.pieMinRadius, f.innerSize || 0),
                  (b = R(b, function(t, e) {
                    return /%$/.test(t)
                      ? ([g, v - p, m, m][e] * V(t)) / 100
                      : t;
                  }))[2] /= 2,
                  b[3] /= 2,
                  b.push(b[2] * h),
                  b.push((b[2] + b[3]) / 2),
                  b.push(b[5] * h),
                  s.center = b,
                  (0, c.fcEach)(u, function(t) {
                    C += t.config.y;
                  }),
                  i = (d = B(1e3 * d) / 1e3) + I,
                  t = u.length - 1;
                t >= 0;
                t -= 1
              )
                (n = u[t]),
                  (a = d),
                  (r = C ? n.config.y / C : 0),
                  (d = B(1e3 * (d + r * I)) / 1e3) > i && (d = i),
                  (o = d),
                  (n.config.shapeArgs = {
                    sAngle: B(1e3 * a) / 1e3,
                    eAngle: B(1e3 * o) / 1e3,
                  });
              for (t = 0; t < D; t++)
                (e = u[t]),
                  this.parsePlotAttributes(e, t),
                  this.parseLabelAttributes(e, t);
            }),
            (a.parsePlotAttributes = function(t, e) {
              var a,
                o,
                n,
                i,
                l,
                s,
                u,
                d,
                f,
                h,
                p,
                g,
                v,
                m,
                b,
                C,
                D,
                _,
                y = this.components,
                S = this.config,
                k = this.getFromEnv('chart'),
                x = k.config,
                A = y.data,
                P = S.dataLabelOptions,
                w = P.style,
                F = S.slicingDistance,
                T = S.slicedOffsetY || (S.slicedOffsetY = F * S.pieYScale),
                B = S.showBorderEffect,
                L = A.length,
                I = S.usePerPointLabelColor,
                E = x.textDirection,
                O = e,
                R = x.dataLabelStyle;
              (a = S.center),
                S.prevPositions,
                (o = S.pieYScale),
                (m = (v = t.config)._textAttrs) || (m = v._textAttrs = {}),
                (b = v._textCss) || (b = v._textCss = {}),
                (l = v.y),
                (s = v.displayValue),
                (d = v.sliced),
                (p = v.shapeArgs),
                (f = v.centerAngle),
                (g = v.toolText),
                (u = !!v.link),
                (w = v.style),
                null !== l &&
                  l !== r &&
                  ((C = {
                    sAngle: p.sAngle,
                    eAngle: p.eAngle,
                    r: a[2],
                    innerR: a[3],
                    cx: a[0],
                    cy: a[1],
                    radiusYFactor: o,
                    opacity: 1,
                  }),
                  s !== r
                    ? (w
                        ? ((b = v._textCss) || (b = v._textCss = {}),
                          (b.fontFamily = w.fontFamily),
                          (b.fontSize = w.fontSize),
                          (b.lineHeight = w.lineHeight),
                          (b.fontWeight = w.fontWeight),
                          (b.fontStyle = w.fontStyle))
                        : v._textCss && (delete v._textCss, (b = r)),
                      (v.style = w || (w = R)),
                      (m.text = s),
                      (m.fill =
                        (I ? (0, c.toRaphaelColor)(v.color) : w.color) ||
                        '#000000'),
                      (m['text-bound'] = [
                        w.backgroundColor,
                        w.borderColor,
                        w.borderThickness,
                        w.borderPadding,
                        w.borderRadius,
                        w.borderDash,
                      ]),
                      (m.direction = E),
                      (m.lineHeight = w.lineHeight),
                      P.distance > 0 &&
                        (h = P.connectorWidth) &&
                        P.enableSmartLabels &&
                        (D = {
                          'stroke-width': h,
                          stroke: P.connectorColor || '#606060',
                          cursor: u ? 'pointer' : '',
                          opacity: 1,
                        }))
                    : (m.text = c.BLANKSTRING),
                  (v.plotItem = i = {
                    chart: k,
                    index: O,
                    seriesData: S,
                    value: l,
                    angle: (v.angle = f),
                    link: v.link,
                    shapeArgs: p,
                    slicedX: d && !S.singletonCase ? M(f) * F : 0,
                    slicedY: d && !S.singletonCase ? N(f) * T : 0,
                    sliced: d,
                    labelText: s,
                    name: v.name,
                    percentage: v.percentage,
                    toolText: g,
                    originalIndex: L - O - 1,
                    style: v.style,
                    transX: (v.transX = M(f) * F),
                    transY: (v.transY = N(f) * T),
                    slicedTranslation: (v.slicedTranslation =
                      't' + v.transX + ',' + v.transY),
                    label: void 0,
                    connector: void 0,
                  }),
                  (v.eventArgs = n = {
                    index: S.reversePlotOrder ? L - 1 - O : O,
                    link: v.link,
                    value: v.y,
                    displayValue: v.displayValueArgs,
                    categoryLabel: v.categoryLabel,
                    isSliced: v.sliced,
                    toolText: v.toolText,
                    color: v.setColor,
                    alpha: v.setAlpha,
                    borderColor: v.borderConfig.setPlotBorderColor,
                    borderAlpha: v.borderConfig.setPlotBorderAlpha,
                    dashed: v.setBorderDashed,
                    showLabel: v.showLabel,
                    showValue: v.showValue,
                    labelPosition: v.labelPosition,
                    valuePosition: v.valuePosition,
                    labelFont: v.labelFont,
                    labelFontColor: v.labelFontColor || '#555555',
                    labelLink: v.labelLink,
                    hoverColor: v.hoverEffects.hoverColor,
                    hoverAlpha: v.hoverEffects.alpha,
                    borderHoverColor: v.hoverBorderColor,
                    borderHoverAlpha: v.hoverEffects.borderAlpha,
                  }),
                  (_ = {
                    color: v.color.color.split(',')[0],
                    alpha: v._3dAlpha,
                    borderWidth: v.borderWidth,
                    borderColor: v.borderColor,
                    borderAlpha: v.borderConfig.setPlotBorderAlpha,
                  }),
                  (0, c.extend2)(C, _),
                  (C.cursor = u ? 'pointer' : ''),
                  (C.showBorderEffect = B),
                  (C.transform = 't' + i.slicedX + ',' + i.slicedY),
                  (m.plotItem = i),
                  (m.eventArgs = n),
                  (v.props = {
                    element: {attr: C},
                    connector: {attr: D},
                    label: {attr: m, css: b},
                  }));
            }),
            (a.draw = function() {
              var t,
                e,
                a,
                o,
                n,
                i,
                l,
                u,
                d,
                f,
                h,
                p,
                g,
                v,
                m,
                b,
                C,
                D,
                _,
                y,
                S,
                k,
                x,
                A,
                P,
                w,
                F,
                T,
                B = this,
                L = B.components,
                I = B.config,
                E = B.getFromEnv('chart'),
                O = E.config,
                R = E.getFromEnv('animationManager'),
                G = L.data,
                V = I.dataLabelOptions,
                z = V.style,
                H = I.slicingDistance,
                Z = I.slicedOffsetY || (I.slicedOffsetY = H * I.pieYScale),
                J = I.showBorderEffect,
                q = G.length,
                K = I.usePerPointLabelColor,
                $ = O.textDirection,
                Q = I.valueTotal,
                tt = L.removeDataArr || [],
                et = B.getState('visible'),
                at = B.getContainer('labelGroup'),
                ot = {},
                nt = B.getFromEnv('toolTipController'),
                rt = O.dataLabelStyle;
              for (
                B.getContainer('pie-groups') || B._createContainer(),
                  at = B.getContainer('label-group'),
                  y = B.getContainer('plot-group'),
                  R.setAnimation({
                    el: at,
                    attr: {css: rt},
                    component: B,
                    label: 'labelcontainer',
                    callback: function() {
                      et && Q ? (at.show(), y.show()) : (at.hide(), y.hide());
                    },
                  }),
                  B._initPie3dManager(),
                  a = B.getFromEnv('pie3DManager'),
                  tt.length && B.remove(),
                  t = I.center,
                  I.prevPositions || t,
                  e = I.pieYScale,
                  (G && q) || (G = []),
                  _ = -1;
                ++_ < q;

              )
                if (
                  ((k = (m = (i = G[_]).config)._textAttrs) ||
                    (k = m._textAttrs = {}),
                  (b = i.graphics),
                  (l = m.y),
                  (u = m.displayValue),
                  (f = m.sliced),
                  (g = m.shapeArgs),
                  (h = m.centerAngle),
                  (v = m.toolText),
                  (d = !!m.link),
                  (z = m.style),
                  null !== l && l !== r)
                ) {
                  for (F in ((S = b.element),
                  (C = b.label),
                  (D = b.connector),
                  (A = {
                    sAngle: g.sAngle,
                    eAngle: g.eAngle,
                    r: t[2],
                    innerR: t[3],
                    cx: t[0],
                    cy: t[1],
                    radiusYFactor: e,
                    opacity: 1,
                  }),
                  S
                    ? (w = !1)
                    : ((w = !0),
                      (S = b.element = a.useSliceFromPool()) ||
                        (S = b.element = a
                          .createSlice()
                          .drag(X, U, j)
                          .on('fc-mouseover', W)
                          .on('fc-mouseout', Y)).on(
                          'fc-click',
                          (0, s.plotClickHandler)(B, S),
                        )),
                  u !== r &&
                    (z
                      ? ((x = m._textCss) || (x = m._textCss = {}),
                        (x.fontFamily = z.fontFamily),
                        (x.fontSize = z.fontSize),
                        (x.lineHeight = z.lineHeight),
                        (x.fontWeight = z.fontWeight),
                        (x.fontStyle = z.fontStyle))
                      : m._textCss &&
                        (C && C.removeCSS(), delete m._textCss, (x = r)),
                    (m.style = z || (z = rt)),
                    (k.text = u),
                    (k.fill =
                      (K ? (0, c.toRaphaelColor)(m.color) : z.color) ||
                      '#000000'),
                    (k['text-bound'] = [
                      z.backgroundColor,
                      z.borderColor,
                      z.borderThickness,
                      z.borderPadding,
                      z.borderRadius,
                      z.borderDash,
                    ]),
                    (k.direction = $),
                    (k.lineHeight = z.lineHeight),
                    V.distance > 0 &&
                      (p = V.connectorWidth) &&
                      V.enableSmartLabels &&
                      ((P = {
                        'stroke-width': p,
                        stroke: V.connectorColor || '#606060',
                        cursor: d ? 'pointer' : '',
                        opacity: 1,
                      }),
                      at.show(),
                      (D = b.connector = R.setAnimation({
                        el: b.connector || 'path',
                        attr: P,
                        container: at,
                        label: 'connector',
                        component: B,
                      })
                        .show()
                        .on('fc-dragstart', U)
                        .on('fc-dragmove', X)
                        .on('fc-dragend', j)
                        .on('fc-mouseover', W)
                        .on('fc-mouseout', Y)))),
                  Q
                    ? (C && C.show(), D && D.show())
                    : (C && C.hide(), D && D.hide()),
                  (n = {
                    chart: E,
                    index: _,
                    seriesData: I,
                    value: l,
                    angle: (m.angle = h),
                    link: m.link,
                    shapeArgs: g,
                    slicedX: f && !I.singletonCase ? M(h) * H : 0,
                    slicedY: f && !I.singletonCase ? N(h) * Z : 0,
                    sliced: f,
                    labelText: u,
                    name: m.name,
                    percentage: m.percentage,
                    toolText: v,
                    originalIndex: q - _ - 1,
                    style: m.style,
                    graphic: S,
                    transX: (m.transX = M(h) * H),
                    transY: (m.transY = N(h) * Z),
                    slicedTranslation: (m.slicedTranslation =
                      't' + m.transX + ',' + m.transY),
                    label: C,
                    connector: D,
                  }),
                  (o = {
                    index: I.reversePlotOrder ? q - 1 - _ : _,
                    link: m.link,
                    value: m.y,
                    displayValue: m.displayValueArgs,
                    categoryLabel: m.categoryLabel,
                    isSliced: m.sliced,
                    toolText: m.toolText,
                    color: m.setColor,
                    alpha: m.setAlpha,
                    borderColor: m.borderConfig.setPlotBorderColor,
                    borderAlpha: m.borderConfig.setPlotBorderAlpha,
                    dashed: m.setBorderDashed,
                    showLabel: m.showLabel,
                    showValue: m.showValue,
                    labelPosition: m.labelPosition,
                    valuePosition: m.valuePosition,
                    labelFont: m.labelFont,
                    labelFontColor: m.labelFontColor || '#555555',
                    labelLink: m.labellink,
                    hoverColor: m.hoverEffects.hoverColor,
                    hoverAlpha: m.hoverEffects.alpha,
                    borderHoverColor: m.hoverBorderColor,
                    borderHoverAlpha: m.hoverEffects.borderAlpha,
                  }),
                  (ot = {
                    color: m.color.color.split(',')[0],
                    alpha: m._3dAlpha,
                    borderWidth: m.borderWidth,
                    borderColor: m.borderColor,
                    borderAlpha: m.borderConfig.setPlotBorderAlpha,
                  }),
                  w && (0, c.extend2)(A, ot),
                  S.data('groupId', _)
                    .data('plotItem', n)
                    .data('eventArgs', o),
                  S.data('groupId', _)
                    .data('plotItem', n)
                    .data('eventArgs', o),
                  (A.cursor = d ? 'pointer' : ''),
                  (A.showBorderEffect = J),
                  (A.color = m.color.color.split(',')[0]),
                  (A.alpha = m._3dAlpha),
                  (A.borderWidth = m.borderWidth),
                  (A.borderColor = m.borderColor),
                  nt.enableToolTip(S, v),
                  (T = S._confObject.elements)))
                    nt.enableToolTip(T[F], v);
                  (A.transform = 't' + n.slicedX + ',' + n.slicedY),
                    (k.plotItem = n),
                    (k.eventArgs = o),
                    R.setAnimation({
                      el: S,
                      attr: A,
                      component: B,
                      label: 'slice',
                      state: w ? 'appearing' : 'updating',
                    }),
                    D && D.data('plotItem', n).data('eventArgs', o);
                }
              at.show(),
                B.placeDataLabels(!1),
                (B.drawn = !0),
                (I.prevPositions = t.slice(0));
            }),
            (a.remove = function() {
              var t,
                e,
                a,
                o,
                n = this.config,
                r = this.components,
                i = this.getFromEnv('animationManager'),
                l = r.removeDataArr || [],
                s = (this.pool = this.pool = []),
                c = l.length,
                u = this.getFromEnv('pie3DManager'),
                d = function(t, e) {
                  return function() {
                    e === b
                      ? (u.removeSlice(t.element), delete t.element)
                      : t[e].hide();
                  };
                },
                f = n.startAngle,
                h = n.center;
              for (a = 0; a < c; a++) {
                for (t in (e = l[0].graphics))
                  (o = e[t]),
                    s[t] || (s[t] = []),
                    t === b
                      ? i.setAnimation({
                          el: o,
                          attr: {
                            sAngle: -f,
                            eAngle: 0.01 - f,
                            r: h[2],
                            innerR: h[3],
                            cx: h[0],
                            cy: h[1],
                          },
                          component: this,
                          callback: d(e, t),
                        })
                      : i.setAnimation({
                          el: o,
                          attr: {opacity: 0},
                          component: this,
                          callback: d(e, t),
                        });
                l.splice(0, 1);
              }
            }),
            (a._rotate = function(t) {
              var e,
                a = this,
                o = t,
                n = a.config,
                r = a.getFromEnv('animationManager'),
                i = a.components.data,
                l = n.slicedOffset,
                s = n.slicedOffsetY,
                u = n.startAngle,
                d = a.getFromEnv('pie3DManager');
              (o = isNaN(o) ? -n._lastAngle : o),
                (e = (o - u) % 360),
                (n.startAngle = (0, c.pluckNumber)(o, n.startAngle) % 360),
                (e = (-e * L) / 180),
                d && d.rotate(e),
                (0, c.fcEach)(i, function(t) {
                  var o,
                    n = t.graphics,
                    i = t.config,
                    u = n.element,
                    d = i.shapeArgs,
                    f = (d.sAngle += e),
                    h = (d.eAngle += e),
                    p = (i.angle = (0, c.normalizeAngle)((f + h) / 2)),
                    g = i.sliced,
                    v = M(p),
                    m = N(p);
                  (o = i.slicedTranslation = [B(v * l), B(m * s)]),
                    (i.transX = o[0]),
                    (i.transY = o[1]),
                    (i.slicedX = g ? M(e) * l : 0),
                    (i.slicedY = g ? N(e) * s : 0),
                    u &&
                      g &&
                      r.setAnimation({
                        el: u,
                        attr: {transform: 't' + o[0] + ',' + o[1]},
                        component: a,
                      });
                }),
                a.placeDataLabels(!0, i);
            }),
            (a.foldingFn = function() {
              var t = this.config.startAngle;
              return {sAngle: -t, eAngle: 0.01 - t};
            }),
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'pie3d';
            }),
            e
          );
        })(s['default']);
        g &&
          g._availableAnimAttrs &&
          g._availableAnimAttrs.cx &&
          (g._availableAnimAttrs.innerR = g._availableAnimAttrs.depth = g._availableAnimAttrs.radiusYFactor = g._availableAnimAttrs.sAngle = g._availableAnimAttrs.eAngle =
            g._availableAnimAttrs.cx),
          (0, p['default'])(g);
        var ut = (function(t) {
            function e(e) {
              var a;
              a = t.call(this) || this;
              var o = (0, i['default'])(a);
              return (o.config = {}), (o.linkedItems = {chart: e}), a;
            }
            (0, l['default'])(e, t);
            var a = e.prototype;
            return (
              (a.getType = function() {
                return 'pie3DManager';
              }),
              (a.getName = function() {
                return 'pie3d';
              }),
              (a.createSlice = function() {
                var t,
                  e = this.renderer,
                  a = {elements: {}, Pie3DManager: this},
                  o = this.slicingWallsArr,
                  n = a.elements,
                  r = c.hasSVG ? 'litepath' : 'path';
                return (
                  ((t = e[r](this.getContainer('topGroup')))._confObject = a),
                  (a.thisElement = t),
                  (t._destroy = t.destroy),
                  (t.destroy = it),
                  (t._show = t.show),
                  (t.show = rt),
                  (t._hide = t.hide),
                  (t.hide = nt),
                  (t._on = t.on),
                  (t.on = at),
                  (t._drag = t.drag),
                  (t.drag = ot),
                  (t._attr = t.attr),
                  (t.attr = et),
                  (t._data = t.data),
                  (t.data = lt),
                  this.pointElemStore.push(t),
                  (n.topBorder = e[r](this.getContainer('topGroup'))),
                  (n.bottom = e[r](this.getContainer('bottomBorderGroup')).attr(
                    {'stroke-width': 0},
                  )),
                  (n.bottomBorder = e[r](
                    this.getContainer('bottomBorderGroup'),
                  )),
                  (n.frontOuter = e[r](
                    this.getContainer('slicingWallsFrontGroup'),
                  ).attr({'stroke-width': 0})),
                  (n.backOuter = e[r](
                    this.getContainer('slicingWallsFrontGroup'),
                  ).attr({'stroke-width': 0})),
                  (n.startSlice = e[r](
                    this.getContainer('slicingWallsFrontGroup'),
                  )),
                  (n.endSlice = e[r](
                    this.getContainer('slicingWallsFrontGroup'),
                  )),
                  (n.frontOuter1 = e[r](
                    this.getContainer('slicingWallsFrontGroup'),
                  ).attr({'stroke-width': 0})),
                  (n.frontOuter._conf = {si: st, isStart: 0.5}),
                  (n.frontOuter1._conf = {si: st, isStart: 0.5}),
                  (n.startSlice._conf = {si: st, isStart: 0}),
                  (n.endSlice._conf = {si: st, isStart: 1}),
                  (n.backOuter._conf = {si: st, isStart: 0.4}),
                  o.push(
                    n.startSlice,
                    n.frontOuter1,
                    n.frontOuter,
                    n.backOuter,
                    n.endSlice,
                  ),
                  this.isDoughnut &&
                    ((n.frontInner = e[r](
                      this.getContainer('slicingWallsFrontGroup'),
                    ).attr({'stroke-width': 0})),
                    (n.backInner = e[r](
                      this.getContainer('slicingWallsFrontGroup'),
                    ).attr({'stroke-width': 0})),
                    (n.backInner._conf = {si: st, isStart: 0.5}),
                    (n.frontInner._conf = {si: st, isStart: 0.4}),
                    o.push(n.frontInner, n.backInner)),
                  (st += 1),
                  t
                );
              }),
              (a.refreshDrawing = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r = this.slicingWallsArr,
                  i = 0,
                  l = r.length,
                  s = this.getContainer('slicingWallsFrontGroup'),
                  c = this.getContainer('slicingWallsBackGroup');
                for (
                  r.sort(Z),
                    e = (function(t) {
                      var e,
                        a,
                        o,
                        n,
                        r = t[0] && t[0]._conf.index;
                      for (o = r <= L, a = 1, e = t.length; a < e; a += 1)
                        if ((n = t[a]._conf.index) <= L !== o || n < r)
                          return a;
                      return 0;
                    })(r);
                  i < l;
                  i += 1, e += 1
                )
                  e === l && (e = 0),
                    (n = (t = r[e])._conf.index) < E
                      ? s.appendChild(t)
                      : n <= L
                      ? (a ? t.insertBefore(a) : s.appendChild(t), (a = t))
                      : n <= O
                      ? (o ? t.insertBefore(o) : c.appendChild(t), (o = t))
                      : c.appendChild(t);
              }),
              (a.configure = function(t, e, a, o) {
                var n = t,
                  r = e,
                  i = a,
                  l = o,
                  s = this.getLinkedParent(),
                  c = this.getFromEnv('paper'),
                  u = s.getContainer('plot-group');
                'object' == typeof n &&
                  ((r = (n = n.depth).hasOnePoint),
                  (i = n.use3DLighting),
                  (l = n.isDoughnut)),
                  this.renderer || (this.renderer = c),
                  (this.hasOnePoint = r),
                  (this.use3DLighting = i),
                  (this.isDoughnut = l),
                  (this.depth = n),
                  !this.getContainer('bottomBorderGroup') &&
                    this.addContainer(
                      'bottomBorderGroup',
                      c.group('bottom-border', u),
                    ),
                  this.getContainer('bottomBorderGroup').attr({
                    transform: 't0,' + n,
                  }),
                  !this.getContainer('slicingWallsBackGroup') &&
                    this.addContainer(
                      'slicingWallsBackGroup',
                      c.group('slicingWalls-back-Side', u),
                    ),
                  !this.getContainer('slicingWallsFrontGroup') &&
                    this.addContainer(
                      'slicingWallsFrontGroup',
                      c.group('slicingWalls-front-Side', u),
                    ),
                  !this.getContainer('topGroup') &&
                    this.addContainer('topGroup', c.group('top-Side', u)),
                  !this.pointElemStore && (this.pointElemStore = []),
                  !this.slicingWallsArr && (this.slicingWallsArr = []),
                  (this.moveCmdArr = [C]),
                  (this.lineCmdArr = [D]),
                  (this.closeCmdArr = [S]),
                  (this.colorObjs = []);
              }),
              (a._parseSliceColor = function(t, e, a) {
                var o,
                  n,
                  r,
                  i,
                  l,
                  s,
                  u,
                  d,
                  f,
                  h,
                  p,
                  g,
                  v,
                  m,
                  b,
                  C,
                  D,
                  _,
                  y,
                  S,
                  k = t,
                  x = e,
                  A = 3,
                  P = this.use3DLighting,
                  w = P ? z.lighting3D : z.lighting2D,
                  N = a.radiusYFactor,
                  F = a.cx,
                  M = a.cy,
                  T = a.r,
                  B = T * N,
                  L = a.innerR || 0,
                  I = F + T,
                  E = F - T,
                  O = F + L,
                  R = F - L;
                return (
                  ~k.indexOf('rgb') && (k = (0, c.rawRGBtoHEX)(k)),
                  (p = (x = x || 100) / 2),
                  w[k] && w[k][x]
                    ? (S = w[k][x])
                    : (w[k] || (w[k] = {}),
                      w[k][x] || (w[k][x] = {}),
                      (S = w[k][x]),
                      P
                        ? ((o = (0, c.getDarkColor)(k, 80)),
                          (n = (0, c.getDarkColor)(k, 75)),
                          (s = (0, c.getLightColor)(k, 85)),
                          (u = (0, c.getLightColor)(k, 70)),
                          (d = (0, c.getLightColor)(k, 40)),
                          (f = (0, c.getLightColor)(k, 50)),
                          (h = (0, c.getLightColor)(k, 65)),
                          (r = (0, c.getDarkColor)(k, 69)),
                          (i = (0, c.getDarkColor)(k, 75)),
                          (l = (0, c.getDarkColor)(k, 95)))
                        : ((A = 10),
                          (o = (0, c.getDarkColor)(k, 90)),
                          (n = (0, c.getDarkColor)(k, 87)),
                          (s = (0, c.getLightColor)(k, 93)),
                          (u = (0, c.getLightColor)(k, 87)),
                          (d = (0, c.getLightColor)(k, 80)),
                          (h = f = (0, c.getLightColor)(k, 85)),
                          (l = (0, c.getDarkColor)(k, 85)),
                          (r = (0, c.getDarkColor)(k, 75)),
                          (i = (0, c.getDarkColor)(k, 80))),
                      (g = n + ',' + s + ',' + u + ',' + s + ',' + n),
                      (m = x + ',' + x + ',' + x + ',' + x + ',' + x),
                      (v = n + ',' + k + ',' + s + ',' + k + ',' + n),
                      (b = p + ',' + p + ',' + p + ',' + p + ',' + p),
                      (D = n + ',' + k + ',' + d + ',' + k + ',' + n),
                      (_ = i + ',' + s + ',' + f + ',' + s + ',' + r),
                      (y = 'FFFFFF,FFFFFF,FFFFFF,FFFFFF,FFFFFF'),
                      (C = '0,' + p / A + ',' + x / A + ',' + p / A + ',0'),
                      c.hasSVG
                        ? (S.top = {
                            FCcolor: {
                              gradientUnits: 'userSpaceOnUse',
                              radialGradient: !0,
                              color: h + ',' + l,
                              alpha: x + ',' + x,
                              ratio: '0,100',
                            },
                          })
                        : (S.top = {
                            FCcolor: {
                              gradientUnits: 'objectBoundingBox',
                              color: u + ',' + u + ',' + s + ',' + n,
                              alpha: x + ',' + x + ',' + x + ',' + x,
                              angle: -72,
                              ratio: '0,8,15,77',
                            },
                          }),
                      (S.frontOuter = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: _,
                          alpha: m,
                          angle: 0,
                          ratio: '0,20,15,15,50',
                        },
                      }),
                      (S.backOuter = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: D,
                          alpha: b,
                          angle: 0,
                          ratio: '0,62,8,8,22',
                        },
                      }),
                      (S.frontInner = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: v,
                          alpha: b,
                          angle: 0,
                          ratio: '0,25,5,5,65',
                        },
                      }),
                      (S.backInner = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: g,
                          alpha: m,
                          angle: 0,
                          ratio: '0,62,8,8,22',
                        },
                      }),
                      (S.topBorder = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: y,
                          alpha: C,
                          angle: 0,
                          ratio: '0,20,15,15,50',
                        },
                      }),
                      (S.topInnerBorder = {
                        FCcolor: {
                          gradientUnits: 'userSpaceOnUse',
                          y1: 0,
                          y2: 0,
                          color: y,
                          alpha: C,
                          angle: 0,
                          ratio: '0,50,15,15,20',
                        },
                      }),
                      (S.bottom = (0, c.toRaphaelColor)(
                        (0, c.convertColor)(k, p),
                      )),
                      (S.startSlice = (0, c.toRaphaelColor)(
                        (0, c.convertColor)(o, x),
                      )),
                      (S.endSlice = (0, c.toRaphaelColor)(
                        (0, c.convertColor)(o, x),
                      ))),
                  (S.cx === F &&
                    S.cy === M &&
                    S.rx === T &&
                    S.radiusYFactor === N &&
                    S.innerRx === L) ||
                    (c.hasSVG &&
                      ((S.top.FCcolor.cx = F),
                      (S.top.FCcolor.cy = M),
                      (S.top.FCcolor.r = T),
                      (S.top.FCcolor.fx = F - 0.3 * T),
                      (S.top.FCcolor.fy = M + 1.2 * B)),
                    (S.topBorder.FCcolor.x1 = S.backOuter.FCcolor.x1 = S.frontOuter.FCcolor.x1 = E),
                    (S.topBorder.FCcolor.x2 = S.backOuter.FCcolor.x2 = S.frontOuter.FCcolor.x2 = I),
                    (S.topInnerBorder.FCcolor.x1 = S.backInner.FCcolor.x1 = S.frontInner.FCcolor.x1 = R),
                    (S.topInnerBorder.FCcolor.x2 = S.backInner.FCcolor.x2 = S.frontInner.FCcolor.x2 = O),
                    (S.cx = F),
                    (S.cy = M),
                    (S.rx = T),
                    (S.radiusYFactor = N),
                    (S.innerRx = L)),
                  S
                );
              }),
              (a.allocatePosition = function() {}),
              (a.rotate = function(t) {
                var e,
                  a = this.pointElemStore,
                  o = 0,
                  n = a.length;
                if (!this.hasOnePoint) {
                  for (; o < n; o += 1)
                    ((e = a[o]._confObject).sAngle += t),
                      (e.eAngle += t),
                      this._setSliceShape(e);
                  this.refreshDrawing();
                }
              }),
              (a.removeSlice = function(t) {
                var e,
                  a,
                  o = this.pointElemStore,
                  n = t._confObject.elements,
                  r = this.slicingWallsArr,
                  i = o.length;
                for (e = i - 1; e >= 0; e -= 1) o[e] === t && o.splice(e, 1);
                for (e = (i = r.length) - 1; e >= 0; e -= 1)
                  ((a = r[e]) !== n.startSlice &&
                    a !== n.frontOuter1 &&
                    a !== n.frontOuter &&
                    a !== n.backInner &&
                    a !== n.endSlice) ||
                    r.splice(e, 1);
                t.hide && t.hide(),
                  this._slicePool || (this._slicePool = []),
                  this._slicePool.push(t),
                  this.refreshDrawing();
              }),
              (a.useSliceFromPool = function() {
                var t,
                  e = this._slicePool || (this._slicePool = []),
                  a = this.slicingWallsArr,
                  o = !1;
                return (
                  e.length &&
                    ((o = e.shift()),
                    this.pointElemStore.push(o),
                    o.show(),
                    (t = o._confObject.elements),
                    a.push(t.startSlice, t.frontOuter1, t.frontOuter),
                    t.backInner && a.push(t.backInner),
                    a.push(t.endSlice)),
                  o
                );
              }),
              (a._setSliceShape = function(t, e) {
                var a,
                  o,
                  n,
                  r,
                  i,
                  l,
                  s,
                  u,
                  d,
                  f,
                  h,
                  p,
                  g,
                  v,
                  m,
                  b,
                  k,
                  x,
                  A,
                  P,
                  w,
                  F,
                  T,
                  B,
                  R,
                  G,
                  V,
                  z,
                  H,
                  W,
                  Y,
                  U,
                  j,
                  X,
                  Z,
                  J,
                  q,
                  K,
                  $,
                  Q,
                  tt,
                  et,
                  at,
                  ot = function(t, e, a, o, n, r, i, l) {
                    return t === a && e === o ? [] : [y, n, r, 0, l, i, a, o];
                  },
                  nt = t.sAngle,
                  rt = t.eAngle,
                  it = (0, c.normalizeAngle)(nt),
                  lt = (0, c.normalizeAngle)(rt),
                  st = this.isDoughnut,
                  ct = t.radiusYFactor,
                  ut = t.cx,
                  dt = t.cy,
                  ft = t.r,
                  ht = ft * ct,
                  pt = ft + (c.hasSVG ? -1 : 2),
                  gt = ht + (c.hasSVG ? -1 : 2),
                  vt = t.innerR || 0,
                  mt = vt * ct,
                  bt = this.depth,
                  Ct = bt + dt,
                  Dt = ut + ft,
                  _t = ut - ft,
                  yt = ut + vt,
                  St = ut - vt,
                  kt = dt - ht,
                  xt = [C, St, kt, D, St, Ct + ht, S],
                  At = t.elements,
                  Pt = 'path',
                  wt = (it + lt) / 2,
                  Nt = it > lt;
                (l = ut + ft * (o = M(it))),
                  (u = ut + pt * o),
                  (d = dt + gt * (n = N(it))),
                  (x = (s = dt + ht * n) + bt),
                  (A = ut + ft * (r = M(lt))),
                  (f = ut + pt * r),
                  (h = dt + gt * (i = N(lt))),
                  (w = (P = dt + ht * i) + bt),
                  st
                    ? ((p = ut + vt * o),
                      (b = (g = dt + mt * n) + bt),
                      (v = ut + vt * r),
                      (k = (m = dt + mt * i) + bt),
                      (t.startSlice = [C, l, s, D, l, x, p, b, p, g, S]),
                      (t.endSlice = [C, A, P, D, A, w, v, k, v, m, S]))
                    : ((t.startSlice = [C, l, s, D, l, x, ut, Ct, ut, dt, S]),
                      (t.endSlice = [C, A, P, D, A, w, ut, Ct, ut, dt, S])),
                  c.hasSVG
                    ? ((a = (function(t, e) {
                        return (t > e ? I : 0) + e - t;
                      })(it, lt)),
                      (t.clipTopPath = st
                        ? [
                            [
                              C,
                              l,
                              s,
                              y,
                              ft,
                              ht,
                              0,
                              a > L ? 1 : 0,
                              1,
                              A,
                              P,
                              D,
                              v,
                              m,
                              y,
                              vt,
                              mt,
                              0,
                              a > L ? 1 : 0,
                              0,
                              p,
                              g,
                              S,
                            ],
                          ]
                        : [
                            [
                              C,
                              l,
                              s,
                              y,
                              ft,
                              ht,
                              0,
                              a > L ? 1 : 0,
                              1,
                              A,
                              P,
                              D,
                              ut,
                              dt,
                              S,
                            ],
                          ]),
                      (t.clipOuterFrontPath1 = [xt]),
                      (t.clipTopBorderPath = [
                        [
                          C,
                          u,
                          d,
                          y,
                          pt,
                          gt,
                          0,
                          a > L ? 1 : 0,
                          1,
                          f,
                          h,
                          D,
                          A,
                          P,
                          A,
                          P + 1,
                          y,
                          ft,
                          ht,
                          0,
                          a > L ? 1 : 0,
                          0,
                          l,
                          s + 1,
                          D,
                          l,
                          s,
                          S,
                        ],
                      ]),
                      nt !== rt
                        ? it > lt
                          ? it < L
                            ? ((t.clipOuterFrontPath = [
                                [
                                  C,
                                  Dt,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  A,
                                  P,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  Dt,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              (t.clipOuterFrontPath1 = [
                                [
                                  C,
                                  _t,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  l,
                                  s,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  _t,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              (t.clipOuterBackPath = [
                                [
                                  C,
                                  Dt,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  1,
                                  0,
                                  _t,
                                  dt,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  1,
                                  1,
                                  Dt,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              st &&
                                ((t.clipInnerBackPath = [
                                  [
                                    C,
                                    yt,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    1,
                                    0,
                                    St,
                                    dt,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    1,
                                    1,
                                    yt,
                                    dt + bt,
                                    S,
                                  ],
                                ]),
                                (t.clipInnerFrontPath = [
                                  [
                                    C,
                                    yt,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    v,
                                    m,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    yt,
                                    dt + bt,
                                    S,
                                    C,
                                    St,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    p,
                                    g,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    St,
                                    dt + bt,
                                    S,
                                  ],
                                ])))
                            : lt > L
                            ? ((t.clipOuterFrontPath = [
                                [
                                  C,
                                  Dt,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  1,
                                  1,
                                  _t,
                                  dt,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  1,
                                  0,
                                  Dt,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              (t.clipOuterBackPath = [
                                [
                                  C,
                                  _t,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  A,
                                  P,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  _t,
                                  dt + bt,
                                  S,
                                  C,
                                  Dt,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  l,
                                  s,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  Dt,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              st &&
                                ((t.clipInnerFrontPath = [
                                  [
                                    C,
                                    yt,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    1,
                                    1,
                                    St,
                                    dt,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    1,
                                    0,
                                    yt,
                                    dt + bt,
                                    S,
                                  ],
                                ]),
                                (t.clipInnerBackPath = [
                                  [
                                    C,
                                    St,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    v,
                                    m,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    St,
                                    dt + bt,
                                    S,
                                    C,
                                    yt,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    p,
                                    g,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    yt,
                                    dt + bt,
                                    S,
                                  ],
                                ])))
                            : ((t.clipOuterFrontPath = [
                                [
                                  C,
                                  Dt,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  A,
                                  P,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  Dt,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              (t.clipOuterBackPath = [
                                [
                                  C,
                                  l,
                                  s,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  Dt,
                                  dt,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  l,
                                  x,
                                  S,
                                ],
                              ]),
                              st &&
                                ((t.clipInnerFrontPath = [
                                  [
                                    C,
                                    yt,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    v,
                                    m,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    yt,
                                    dt + bt,
                                    S,
                                  ],
                                ]),
                                (t.clipInnerBackPath = [
                                  [
                                    C,
                                    p,
                                    g,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    yt,
                                    dt,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    p,
                                    b,
                                    S,
                                  ],
                                ])))
                          : it < L
                          ? lt > L
                            ? ((t.clipOuterFrontPath = [
                                [
                                  C,
                                  l,
                                  s,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  _t,
                                  dt,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  l,
                                  x,
                                  S,
                                ],
                              ]),
                              (t.clipOuterBackPath = [
                                [
                                  C,
                                  _t,
                                  dt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  A,
                                  P,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  _t,
                                  dt + bt,
                                  S,
                                ],
                              ]),
                              st &&
                                ((t.clipInnerFrontPath = [
                                  [
                                    C,
                                    p,
                                    g,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    St,
                                    dt,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    p,
                                    b,
                                    S,
                                  ],
                                ]),
                                (t.clipInnerBackPath = [
                                  [
                                    C,
                                    St,
                                    dt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    v,
                                    m,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    St,
                                    dt + bt,
                                    S,
                                  ],
                                ])))
                            : ((t.clipOuterFrontPath = [
                                [
                                  C,
                                  l,
                                  s,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  1,
                                  A,
                                  P,
                                  _,
                                  bt,
                                  y,
                                  ft,
                                  ht,
                                  0,
                                  0,
                                  0,
                                  l,
                                  x,
                                  S,
                                ],
                              ]),
                              (t.clipOuterBackPath = [xt]),
                              st &&
                                ((t.clipInnerFrontPath = [
                                  [
                                    C,
                                    p,
                                    g,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    1,
                                    v,
                                    m,
                                    _,
                                    bt,
                                    y,
                                    vt,
                                    mt,
                                    0,
                                    0,
                                    0,
                                    p,
                                    b,
                                    S,
                                  ],
                                ]),
                                (t.clipInnerBackPath = [xt])))
                          : ((t.clipOuterFrontPath = [xt]),
                            (t.clipOuterBackPath = [
                              [
                                C,
                                l,
                                s,
                                y,
                                ft,
                                ht,
                                0,
                                0,
                                1,
                                A,
                                P,
                                _,
                                bt,
                                y,
                                ft,
                                ht,
                                0,
                                0,
                                0,
                                l,
                                x,
                                S,
                              ],
                            ]),
                            st &&
                              ((t.clipInnerFrontPath = [xt]),
                              (t.clipInnerBackPath = [
                                [
                                  C,
                                  p,
                                  g,
                                  y,
                                  vt,
                                  mt,
                                  0,
                                  0,
                                  1,
                                  v,
                                  m,
                                  _,
                                  bt,
                                  y,
                                  vt,
                                  mt,
                                  0,
                                  0,
                                  0,
                                  p,
                                  b,
                                  S,
                                ],
                              ])))
                        : (t.clipOuterFrontPath = t.clipOuterBackPath = t.clipInnerBackPath = t.clipInnerFrontPath = [
                            xt,
                          ]),
                      (Pt = 'litepath'),
                      (t.clipBottomBorderPath = t.clipTopPath),
                      (t.startSlice = [t.startSlice]),
                      (t.endSlice = [t.endSlice]))
                    : ((z = this.moveCmdArr),
                      (H = this.lineCmdArr),
                      (W = this.closeCmdArr),
                      (Y = [ut, dt]),
                      (U = [_t, dt]),
                      (j = [ut, kt]),
                      (X = [Dt, dt]),
                      (Z = [ut, dt + ht]),
                      (J = [_t, Ct]),
                      (q = [Dt, Ct]),
                      (K = [St, dt]),
                      ($ = [yt, dt]),
                      (Q = [St, Ct]),
                      (tt = [yt, Ct]),
                      (t.clipOuterFrontPath1 = []),
                      nt !== rt
                        ? (it > lt
                            ? it < L
                              ? ((F = ot(l, s, _t, dt, ft, ht, 1, 0)),
                                (B = ot(_t, dt, Dt, dt, ft, ht, 1, 0)),
                                (G = ot(Dt, dt, A, P, ft, ht, 1, 0)),
                                (t.clipOuterBackPath = z.concat(
                                  U,
                                  B,
                                  H,
                                  q,
                                  ot(Dt, Ct, _t, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipOuterFrontPath1 = z.concat(
                                  [l, s],
                                  F,
                                  H,
                                  J,
                                  ot(_t, Ct, l, x, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipOuterFrontPath = z.concat(
                                  X,
                                  G,
                                  H,
                                  [A, w],
                                  ot(A, w, Dt, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipTopBorderPath = z.concat(
                                  [l, s],
                                  F,
                                  B,
                                  G,
                                )),
                                st
                                  ? ((T = ot(v, m, yt, dt, vt, mt, 0, 0)),
                                    (R = ot(yt, dt, St, dt, vt, mt, 0, 0)),
                                    (V = ot(St, dt, p, g, vt, mt, 0, 0)),
                                    (t.clipInnerBackPath = z.concat(
                                      $,
                                      R,
                                      H,
                                      Q,
                                      ot(St, Ct, yt, Ct, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipInnerFrontPath = z.concat(
                                      K,
                                      V,
                                      H,
                                      [p, b],
                                      ot(p, b, St, Ct, vt, mt, 1, 0),
                                      W,
                                      z,
                                      [v, m],
                                      T,
                                      H,
                                      tt,
                                      ot(yt, Ct, v, k, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      [v, m],
                                      T,
                                      R,
                                      V,
                                      W,
                                    )),
                                    (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                      z,
                                      [v, m],
                                      T,
                                      R,
                                      V,
                                    )))
                                  : (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      Y,
                                      W,
                                    )))
                              : lt > L
                              ? ((F = ot(l, s, Dt, dt, ft, ht, 1, 0)),
                                (B = ot(Dt, dt, _t, dt, ft, ht, 1, 0)),
                                (G = ot(_t, dt, A, P, ft, ht, 1, 0)),
                                (t.clipOuterFrontPath = z.concat(
                                  X,
                                  B,
                                  H,
                                  J,
                                  ot(_t, Ct, Dt, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipOuterBackPath = z.concat(
                                  [l, s],
                                  F,
                                  H,
                                  q,
                                  ot(Dt, Ct, l, x, ft, ht, 0, 0),
                                  W,
                                  z,
                                  U,
                                  G,
                                  H,
                                  [A, w],
                                  ot(A, w, _t, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipTopBorderPath = z.concat(
                                  [l, s],
                                  F,
                                  B,
                                  G,
                                )),
                                st
                                  ? ((T = ot(v, m, St, dt, vt, mt, 0, 0)),
                                    (R = ot(St, dt, yt, dt, vt, mt, 0, 0)),
                                    (V = ot(yt, dt, p, g, vt, mt, 0, 0)),
                                    (t.clipInnerFrontPath = z.concat(
                                      K,
                                      R,
                                      H,
                                      tt,
                                      ot(yt, Ct, St, Ct, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipInnerBackPath = z.concat(
                                      $,
                                      V,
                                      H,
                                      [p, b],
                                      ot(p, b, yt, Ct, vt, mt, 1, 0),
                                      W,
                                      z,
                                      [v, m],
                                      T,
                                      H,
                                      Q,
                                      ot(St, Ct, v, k, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      [v, m],
                                      T,
                                      R,
                                      V,
                                      W,
                                    )),
                                    (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                      z,
                                      [v, m],
                                      T,
                                      R,
                                      V,
                                    )))
                                  : (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      Y,
                                      W,
                                    )))
                              : ((F = ot(l, s, Dt, dt, ft, ht, 1, 0)),
                                (B = ot(Dt, dt, A, P, ft, ht, 1, 0)),
                                (t.clipOuterFrontPath = z.concat(
                                  X,
                                  B,
                                  H,
                                  [A, w],
                                  ot(A, w, Dt, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipOuterBackPath = z.concat(
                                  [l, s],
                                  F,
                                  H,
                                  q,
                                  ot(Dt, Ct, l, x, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipTopBorderPath = z.concat([l, s], F, B)),
                                st
                                  ? ((T = ot(v, m, yt, dt, vt, mt, 0, 0)),
                                    (R = ot(yt, dt, p, g, vt, mt, 0, 0)),
                                    (t.clipInnerFrontPath = z.concat(
                                      [v, m],
                                      T,
                                      H,
                                      tt,
                                      ot(yt, Ct, v, k, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipInnerBackPath = z.concat(
                                      $,
                                      R,
                                      H,
                                      [p, b],
                                      ot(p, b, yt, Ct, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      [v, m],
                                      T,
                                      R,
                                      W,
                                    )),
                                    (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                      z,
                                      [v, m],
                                      T,
                                      R,
                                    )))
                                  : (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      Y,
                                      W,
                                    )))
                            : it < L
                            ? lt > L
                              ? ((F = ot(l, s, _t, dt, ft, ht, 1, 0)),
                                (B = ot(_t, dt, A, P, ft, ht, 1, 0)),
                                (t.clipOuterBackPath = z.concat(
                                  U,
                                  B,
                                  H,
                                  [A, w],
                                  ot(A, w, _t, Ct, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipOuterFrontPath = z.concat(
                                  [l, s],
                                  F,
                                  H,
                                  J,
                                  ot(_t, Ct, l, x, ft, ht, 0, 0),
                                  W,
                                )),
                                (t.clipTopBorderPath = z.concat([l, s], F, B)),
                                st
                                  ? ((T = ot(v, m, St, dt, vt, mt, 0, 0)),
                                    (R = ot(St, dt, p, g, vt, mt, 0, 0)),
                                    (t.clipInnerBackPath = z.concat(
                                      [v, m],
                                      T,
                                      H,
                                      Q,
                                      ot(St, Ct, v, k, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipInnerFrontPath = z.concat(
                                      K,
                                      R,
                                      H,
                                      [p, b],
                                      ot(p, b, St, Ct, vt, mt, 1, 0),
                                      W,
                                    )),
                                    (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      [v, m],
                                      T,
                                      R,
                                      W,
                                    )),
                                    (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                      z,
                                      [v, m],
                                      T,
                                      R,
                                    )))
                                  : (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      Y,
                                      W,
                                    )))
                              : ((F = ot(l, s, A, P, ft, ht, 1, 0)),
                                (t.clipOuterBackPath = z.concat([l, s])),
                                (t.clipTopBorderPath = t.clipOuterBackPath.concat(
                                  F,
                                )),
                                (t.clipOuterFrontPath = t.clipTopBorderPath.concat(
                                  H,
                                  [A, w],
                                  ot(A, w, l, x, ft, ht, 0, 0),
                                  W,
                                )),
                                st
                                  ? ((T = ot(v, m, p, g, vt, mt, 0, 0)),
                                    (t.clipInnerBackPath = z.concat([v, m])),
                                    (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      [v, m],
                                      T,
                                      W,
                                    )),
                                    (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                      z,
                                      [v, m],
                                      T,
                                    )),
                                    (t.clipInnerFrontPath = t.clipInnerBackPath.concat(
                                      T,
                                      H,
                                      [p, b],
                                      ot(p, b, v, k, vt, mt, 1, 0),
                                      W,
                                    )))
                                  : (t.clipTopPath = t.clipTopBorderPath.concat(
                                      H,
                                      Y,
                                      W,
                                    )))
                            : ((F = ot(l, s, A, P, ft, ht, 1, 0)),
                              (t.clipOuterFrontPath = z.concat([l, s])),
                              (t.clipTopBorderPath = t.clipOuterFrontPath.concat(
                                F,
                              )),
                              (t.clipOuterBackPath = t.clipTopBorderPath.concat(
                                H,
                                [A, w],
                                ot(A, w, l, x, ft, ht, 0, 0),
                                W,
                              )),
                              st
                                ? ((T = ot(v, m, p, g, vt, mt, 0, 0)),
                                  (t.clipInnerFrontPath = z.concat([v, m])),
                                  (t.clipTopPath = t.clipTopBorderPath.concat(
                                    H,
                                    [v, m],
                                    T,
                                    W,
                                  )),
                                  (t.clipTopBorderPath = t.clipTopBorderPath.concat(
                                    t.clipInnerFrontPath,
                                    T,
                                  )),
                                  (t.clipInnerBackPath = t.clipInnerFrontPath.concat(
                                    T,
                                    H,
                                    [p, b],
                                    ot(p, b, v, k, vt, mt, 1, 0),
                                    W,
                                  )))
                                : (t.clipTopPath = t.clipTopBorderPath.concat(
                                    H,
                                    Y,
                                    W,
                                  ))),
                          (F = z.concat(U, H, X)),
                          (T = z.concat(j, H, Z)),
                          (t.clipTopPath = t.clipTopPath.concat(F, T)),
                          (t.clipOuterFrontPath = t.clipOuterFrontPath.concat(
                            F,
                          )),
                          (t.clipOuterFrontPath1 = t.clipOuterFrontPath1.concat(
                            F,
                          )),
                          (t.clipOuterBackPath = t.clipOuterBackPath.concat(F)),
                          st &&
                            ((T = z.concat(K, H, $)),
                            (t.clipInnerFrontPath = t.clipInnerFrontPath.concat(
                              T,
                            )),
                            (t.clipInnerBackPath = t.clipInnerBackPath.concat(
                              T,
                            ))))
                        : ((t.clipTopPath = t.clipOuterFrontPath = t.clipOuterBackPath = []),
                          st &&
                            (t.clipInnerFrontPath = t.clipInnerBackPath = [])),
                      (t.clipBottomBorderPath = t.clipTopBorderPath)),
                  e ||
                    ((At.startSlice._conf.index = it),
                    (At.endSlice._conf.index = lt),
                    (At.backOuter._conf.index = at =
                      (Nt && (it <= O || lt > O)) || (it <= O && lt > O)
                        ? O
                        : it > L
                        ? it
                        : lt),
                    (At.frontOuter._conf.index = et =
                      lt <= E ? lt : it > lt || it <= E ? E : it),
                    (At.frontOuter1._conf.index = it),
                    (At.frontOuter1._conf.cIndex = L),
                    it > lt
                      ? ((At.backOuter._conf.cIndex = it < O ? O : I),
                        (At.startSlice._conf.cIndex =
                          it < L ? (it + L) / 2 : (it + I) / 2),
                        (At.endSlice._conf.cIndex = At.frontOuter._conf.cIndex = 0))
                      : (At.backOuter._conf.cIndex = At.startSlice._conf.cIndex = At.endSlice._conf.cIndex = At.frontOuter._conf.cIndex = wt),
                    a > L
                      ? At.frontOuter1.show().attr(Pt, t.clipOuterFrontPath1)
                      : At.frontOuter1.hide(),
                    t.thisElement._attr(Pt, t.clipTopPath),
                    At.bottom.attr(Pt, t.clipTopPath),
                    At.bottomBorder.attr(Pt, t.clipBottomBorderPath),
                    At.topBorder && At.topBorder.attr(Pt, t.clipTopBorderPath),
                    At.frontOuter.attr(Pt, t.clipOuterFrontPath),
                    At.backOuter.attr(Pt, t.clipOuterBackPath),
                    st &&
                      (At.backInner.attr(Pt, t.clipInnerBackPath),
                      At.frontInner.attr(Pt, t.clipInnerFrontPath),
                      (At.backInner._conf.index = at),
                      (At.frontInner._conf.index = et),
                      it > lt
                        ? ((At.backInner._conf.cIndex = I),
                          (At.frontInner._conf.cIndex = 0))
                        : (At.backInner._conf.cIndex = At.frontInner._conf.cIndex = wt)),
                    this.hasOnePoint
                      ? (At.startSlice.hide(), At.endSlice.hide())
                      : (At.startSlice.attr(Pt, t.startSlice).show(),
                        At.endSlice.attr(Pt, t.endSlice).show()));
              }),
              (a._setSliceCosmetics = function(t) {
                var e,
                  a,
                  o = t.thisElement,
                  n = t.showBorderEffect,
                  r = t.elements,
                  i = (0, c.convertColor)(
                    t.borderColor,
                    (0, c.pluckNumber)(t.borderAlpha, t.alpha),
                  ),
                  l = t.borderWidth;
                t.color &&
                  ((t.color = t.color.color ? t.color.color : t.color),
                  (e = this._parseSliceColor(t.color, t.alpha, t)),
                  c.hasSVG
                    ? ((a = {
                        fill: (0, c.toRaphaelColor)(e.top),
                        'stroke-width': 0,
                      }),
                      n
                        ? r.topBorder
                            .show()
                            .attr({
                              fill: (0, c.toRaphaelColor)(e.topBorder),
                              'stroke-width': 0,
                            })
                        : (r.topBorder.hide(),
                          (a.stroke = i),
                          (a['stroke-width'] = l)),
                      o._attr(a))
                    : (o._attr({
                        fill: (0, c.toRaphaelColor)(e.top),
                        'stroke-width': 0,
                      }),
                      r.topBorder.attr({stroke: i, 'stroke-width': l})),
                  r.bottom.attr({fill: (0, c.toRaphaelColor)(e.bottom)}),
                  r.bottomBorder.attr({stroke: i, 'stroke-width': l}),
                  r.frontOuter.attr({
                    fill: (0, c.toRaphaelColor)(e.frontOuter),
                  }),
                  r.frontOuter1.attr({
                    fill: (0, c.toRaphaelColor)(e.frontOuter),
                  }),
                  r.backOuter.attr({fill: (0, c.toRaphaelColor)(e.backOuter)}),
                  r.startSlice.attr({
                    fill: (0, c.toRaphaelColor)(e.startSlice),
                    stroke: i,
                    'stroke-width': l,
                  }),
                  r.endSlice.attr({
                    fill: (0, c.toRaphaelColor)(e.endSlice),
                    stroke: i,
                    'stroke-width': l,
                  }),
                  this.isDoughnut &&
                    (r.frontInner.attr({
                      fill: (0, c.toRaphaelColor)(e.frontInner),
                    }),
                    r.backInner.attr({
                      fill: (0, c.toRaphaelColor)(e.backInner),
                    })));
              }),
              e
            );
          })(u.ComponentInterface),
          dt = ct;
        e['default'] = dt;
      },
      549: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = e._getInnerSize = void 0);
        var n = o(a(207)),
          r = o(a(542)),
          i = a(201),
          l = a(193),
          s = o(a(550)),
          c = function() {
            var t,
              e,
              a,
              o,
              n,
              r,
              i,
              s,
              c,
              u = this.getFromEnv('chart'),
              d = this.config,
              f = u.getFromEnv('dataSource').chart,
              h = d.doughnutradius,
              p = (0, l.pluckNumber)(f.use3dlighting, 1)
                ? (0, l.pluckNumber)(f.radius3d, f['3dradius'], 50)
                : 100,
              g = d.pieMinRadius;
            if (
              (p > 100 && (p = 100),
              p < 0 && (p = 0),
              (t = /%/.test(h)
                ? g * (h = Number(h.split('%')[0]) / 100)
                : h <= 0 || h >= g
                ? g / 2
                : (0, l.pluckNumber)(h)),
              (d.innerRadius = t),
              p > 0 &&
                l.hasSVG &&
                ((a = (100 - (e = parseInt((t / g) * 100, 10))) / 2),
                (r =
                  e +
                  ',' +
                  (o = parseInt((a * p) / 100, 10)) +
                  ',' +
                  2 * (a - o) +
                  ',' +
                  o),
                this && (s = this.components.data)))
            )
              for (i = 0, c = s.length; i < c; i += 1)
                (n = s[i].config).color &&
                  ((n.color.ratio = r),
                  n.hoverEffects &&
                    n.hoverEffects.color &&
                    (n.hoverEffects.color.ratio = r));
            return 2 * t;
          };
        (e._getInnerSize = c),
          (0, i.addDep)({
            name: 'doughnut2dAnimation',
            type: 'animationRule',
            extension: s['default'],
          });
        var u = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'doughnut2D';
            }),
            (a.configureAttributes = function(e) {
              t.prototype.configureAttributes.call(this, e);
              var a = this.config,
                o = this.getFromEnv('chartConfig');
              a.doughnutradius = (0, l.pluck)(
                o.doughnutradius,
                a.doughnutradius,
                '50%',
              );
            }),
            (a.__setDefaultConfig = function() {
              t.prototype.__setDefaultConfig.call(this),
                (this.config.doughnutradius = '50%');
            }),
            (a._parsePiePlotOptions = function() {
              var e = t.prototype._parsePiePlotOptions.call(this);
              return (e.innerSize = this._getInnerSize()), e;
            }),
            (a._getInnerSize = function() {
              return c.call(this);
            }),
            (a.allocatePosition = function() {
              (this.config.innerSize = this._getInnerSize()),
                t.prototype.allocatePosition.call(this);
            }),
            e
          );
        })(r['default']);
        e['default'] = u;
      },
      550: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = {
          'initial.dataset.doughnut2D': o(a(543))['default'][
            'initial.dataset.pie2D'
          ],
        };
        e['default'] = n;
      },
      551: function(t, e, a) {
        'use strict';
        (e.__esModule = !0), (e['default'] = void 0);
        var o = {
          'initial.dataset.pie3d': function() {
            return {
              'group.appearing': function(t) {
                var e = t.component.getFromEnv('chartConfig');
                return 'plots' === t.attr.name
                  ? [
                      {
                        initialAttr: {opacity: '0'},
                        finalAttr: {opacity: '1'},
                        slot: e.alphaanimation ? 'plot' : 'initial',
                      },
                    ]
                  : [
                      {
                        initialAttr: {opacity: '1'},
                        finalAttr: {opacity: '1'},
                        slot: 'final',
                      },
                    ];
              },
              'slice.appearing': function(t) {
                var e = t.component,
                  a = e.getFromEnv('chart').config,
                  o = e.config,
                  n = t.attr;
                return a.alphaanimation
                  ? [{initialAttr: {opacity: '1'}, slot: 'plot'}]
                  : o.animateClockWise
                  ? [
                      {
                        initialAttr: {sAngle: 0, eAngle: 0, transform: ''},
                        finalAttr: {
                          sAngle: n.sAngle,
                          eAngle: n.eAngle,
                          transform: '',
                        },
                        slot: 'plot',
                        startEnd: {start: 0, end: 0.75},
                      },
                      {
                        finalAttr: {transform: n.transform},
                        slot: 'plot',
                        startEnd: {start: 0.75, end: 1},
                      },
                    ]
                  : [
                      {
                        initialAttr: {
                          sAngle: 2 * Math.PI,
                          eAngle: 2 * Math.PI,
                          transform: '',
                        },
                        finalAttr: {
                          sAngle: n.sAngle,
                          eAngle: n.eAngle,
                          transform: '',
                        },
                        slot: 'plot',
                        startEnd: {start: 0, end: 0.75},
                      },
                      {
                        finalAttr: {transform: n.transform},
                        slot: 'plot',
                        startEnd: {start: 0.75, end: 1},
                      },
                    ];
              },
              'label.updating': [
                {
                  initialAttr: {opacity: '1'},
                  finalAttr: {opacity: '1'},
                  slot: 'final',
                },
              ],
              'label.appearing': [
                {
                  initialAttr: {opacity: '0'},
                  finalAttr: {opacity: '1'},
                  slot: 'final',
                },
              ],
              'connector.updating': function(t) {
                return [
                  {
                    initialAttr: {
                      path: t.el.attr('path') || t.attr.path,
                      opacity: t.el.attr('opacity'),
                    },
                    finalAttr: {path: t.attr.path},
                    slot: 'final',
                  },
                ];
              },
              'connector.appearing': function(t) {
                return [
                  {
                    initialAttr:
                      'string' == typeof t.el
                        ? {opacity: '0'}
                        : {path: t.attr.path, opacity: '0'},
                    slot: 'final',
                  },
                ];
              },
              'connector-sliced.updating': function(t) {
                return [
                  {
                    initialAttr: {path: t.el.attr('path')},
                    finalAttr: {path: t.attr.path},
                    slot: 'plot',
                  },
                ];
              },
              'label-sliced.updating': function(t) {
                return [
                  {
                    initialAttr: {x: t.el.attr('x'), y: t.el.attr('y')},
                    slot: 'plot',
                  },
                ];
              },
              '*': null,
            };
          },
        };
        e['default'] = o;
      },
      553: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(554))['default'];
        e['default'] = n;
      },
      554: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(541)),
          i = o(a(549)),
          l = a(193),
          s = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Doughnut2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Doughnut2D';
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e);
                var a = this.config,
                  o = this.getFromEnv('chart-attrib');
                a.doughnutradius = (0, l.pluck)(o.doughnutradius, '50%');
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Doughnut Chart'),
                  (e.defaultDatasetType = 'Doughnut2D'),
                  (e.singletonPlaceValue = !1);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      555: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(556))['default'];
        e['default'] = n;
      },
      556: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(547)),
          i = o(a(557)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Doughnut3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Doughnut3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = '3D Doughnut Chart'),
                  (e.defaultDatasetType = 'Doughnut3D'),
                  (e.singletonPlaceValue = !1);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      557: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(548)),
          i = o(a(558)),
          l = a(201),
          s = a(193);
        (0, l.addDep)({
          name: 'doughnut3dAnimation',
          type: 'animationRule',
          extension: i['default'],
        });
        var c = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'doughnut3D';
            }),
            (a.__setDefaultConfig = function() {
              t.prototype.__setDefaultConfig.call(this),
                (this.config.doughnutradius = '50%');
            }),
            (a._configurePie3DManager = function() {
              var t = this.config,
                e = this.components,
                a = this.getFromEnv('pie3DManager'),
                o = e.data;
              a &&
                a.configure(
                  t.pieSliceDepth,
                  1 === o.length,
                  t.use3DLighting,
                  !0,
                );
            }),
            (a.configureAttributes = function(e) {
              t.prototype.configureAttributes.call(this, e);
              var a = this.config,
                o = this.getFromEnv('chartConfig');
              a.doughnutradius = (0, s.pluck)(
                o.doughnutradius,
                a.doughnutradius,
                '50%',
              );
            }),
            e
          );
        })(r['default']);
        e['default'] = c;
      },
      558: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = {
          'initial.dataset.doughnut3D': o(a(551))['default'][
            'initial.dataset.pie3d'
          ],
        };
        e['default'] = n;
      },
      559: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(560))['default'];
        e['default'] = n;
      },
      560: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e._setCategories = f), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(561)),
          i = a(565),
          l = a(567),
          s = o(a(568)),
          c = a(193),
          u = o(a(569)),
          d = c.preDefStr.NINETYSTRING;
        function f() {
          var t,
            e,
            a = this.getFromEnv('dataSource'),
            o = a.dataset,
            n = this.getFromEnv('number-formatter'),
            r = this.getChildren('xAxis'),
            i = a.data || (o && o[0].data) || [],
            l = [],
            s = {};
          for (e = i.length - 1; e >= 0; e--)
            'true' === (t = i[e]).vline ||
            '1' === t.vline ||
            1 === t.vline ||
            !0 === t.vline
              ? ((s[e] = t), i.splice(e, 1))
              : null === n.getCleanValue(t.value, !0) && i.splice(e, 1);
          for (e in (i.sort(function(t, e) {
            return n.getCleanValue(e.value, !0) - n.getCleanValue(t.value, !0);
          }),
          (l = i.slice()),
          s))
            l.splice(e, 0, s[e]);
          r[0].setTickValues(l);
        }
        var h = (function(t) {
          function e() {
            var e;
            return (
              ((e = t.call(this) || this).isPercentage = !0),
              e.registerFactory('axis', s['default'], ['canvas']),
              e.registerFactory('dataset', u['default'], ['vCanvas']),
              e
            );
          }
          (0, n['default'])(e, t),
            (e.getName = function() {
              return 'Pareto2D';
            });
          var a = e.prototype;
          return (
            (a.getName = function() {
              return 'Pareto2D';
            }),
            (a.__setDefaultConfig = function() {
              t.prototype.__setDefaultConfig.call(this);
              var e = this.config;
              (e.singleseries = !0),
                (e.hasLegend = !1),
                (e.defaultDatasetType = 'column'),
                (e.plotfillalpha = d),
                (e.enablemousetracking = !0);
            }),
            (a._setCategories = function() {
              f.call(this);
            }),
            (a._checkInvalidSpecificData = function() {
              var t = this.getFromEnv('dataSource').data;
              if (!t || !t.length) return !0;
            }),
            (a.getDSdef = function(t) {
              return 'column' === t
                ? i.ParetoColumnDataset
                : l.ParetoLineDataset;
            }),
            (a.getDSGroupdef = function() {}),
            e
          );
        })(r['default']);
        e['default'] = h;
      },
      565: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e.ParetoColumnDataset = void 0);
        var n = o(a(207)),
          r = a(193),
          i = o(a(492)),
          l = a(201),
          s = o(a(566)),
          c = Math,
          u = c.min,
          d = c.max,
          f = c.abs;
        (0, l.addDep)({
          name: 'paretoAnimation',
          type: 'animationRule',
          extension: s['default'],
        });
        var h = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'paretoColumn';
            }),
            (a.configureAttributes = function(t) {
              if (!t) return !1;
              this.trimData(t), (this.config.JSONData = t);
              var e,
                a,
                o,
                n,
                i,
                l,
                s,
                c,
                h,
                p,
                g,
                v,
                m,
                b,
                C,
                D,
                _,
                y,
                S,
                k,
                x,
                A,
                P,
                w,
                N,
                F,
                M,
                T,
                B,
                L,
                I,
                E,
                O,
                R,
                G,
                V,
                z,
                H,
                W,
                Y,
                U,
                j,
                X,
                Z,
                J,
                q,
                K,
                $,
                Q = this.getFromEnv('chart'),
                tt = this.config,
                et = this.getFromEnv('xAxis'),
                at = tt.JSONData,
                ot = at.data,
                nt = ot && ot.length,
                rt = this.getFromEnv('chart-attrib'),
                it = this.getFromEnv('color-manager'),
                lt = this.index || this.positionIndex,
                st = it.getPlotColor(lt),
                ct = (0, r.pluckNumber)(at.dashed, rt.plotborderdashed),
                ut = (0, r.pluckNumber)(rt.useplotgradientcolor, 1),
                dt = (0, r.pluckNumber)(rt.showtooltip, 1),
                ft = (0, r.parseUnsafeString)(rt.yaxisname),
                ht = (0, r.parseUnsafeString)(rt.xaxisname),
                pt = this.components.data,
                gt = this.getFromEnv('number-formatter'),
                vt = Q.config.is3D,
                mt = -Infinity,
                bt = +Infinity,
                Ct = 0,
                Dt = [],
                _t = 0,
                yt = (tt.tootipSepChar = (0, r.pluck)(rt.tooltipsepchar, ', '));
              for (
                tt.defaultPadding = {left: 0.5, right: 0.5},
                  tt.enableAnimation = Y = (0, r.pluckNumber)(
                    rt.animation,
                    rt.defaultanimation,
                    1,
                  ),
                  tt.animation = !!Y && {
                    duration: 1e3 * (0, r.pluckNumber)(rt.animationduration, 1),
                  },
                  tt.showTooltip = (0, r.pluckNumber)(rt.showtooltip, 1),
                  tt.showTextOutline = (0, r.pluckNumber)(rt.textoutline, 0),
                  tt.valuePadding = (0, r.pluckNumber)(rt.valuepadding, 2),
                  tt.rotateValues = (0, r.pluckNumber)(rt.rotatevalues)
                    ? 270
                    : 0,
                  tt.showHoverEffect = v = (0, r.pluckNumber)(
                    rt.plothovereffect,
                    rt.showhovereffect,
                    void 0,
                  ),
                  tt.showShadow =
                    g || vt
                      ? (0, r.pluckNumber)(rt.showshadow, 1)
                      : (0, r.pluckNumber)(
                          rt.showshadow,
                          it.getColor('showShadow'),
                        ),
                  tt.useDataPlotColorForLabels = $ = (0, r.pluckNumber)(
                    rt.usedataplotcolorforlabels,
                    0,
                  ),
                  tt.use3dlineshift = (0, r.pluckNumber)(
                    rt.use3dlineshift,
                    Q.use3dlineshift,
                  ),
                  e = tt.showplotborder = (0, r.pluckNumber)(
                    rt.showplotborder,
                    vt ? 0 : 1,
                  ),
                  tt.plotDashLen = c = (0, r.pluckNumber)(
                    rt.plotborderdashlen,
                    5,
                  ),
                  tt.plotDashGap = h = (0, r.pluckNumber)(
                    rt.plotborderdashgap,
                    4,
                  ),
                  tt.plotfillangle = m = (0, r.pluckNumber)(
                    360 - rt.plotfillangle,
                    90,
                  ),
                  tt.plotfillalpha = b = (0, r.pluck)(rt.plotfillalpha, '100'),
                  tt.plotColor = st,
                  tt.isRoundEdges = g = (0, r.pluckNumber)(rt.useroundedges, 0),
                  tt.plotRadius = (0, r.pluckNumber)(
                    rt.useRoundEdges,
                    tt.isRoundEdges ? 1 : 0,
                  ),
                  tt.plotfillratio = C = (0, r.pluck)(rt.plotfillratio),
                  tt.plotgradientcolor = D = (0, r.getDefinedColor)(
                    rt.plotgradientcolor,
                    it.getColor('plotGradientColor'),
                  ),
                  !ut && (D = ''),
                  tt.plotborderalpha = _ =
                    e && !vt ? (0, r.pluck)(rt.plotborderalpha, b, '100') : 0,
                  tt.plotbordercolor = y = (0, r.pluck)(
                    rt.plotbordercolor,
                    vt ? '#ffffff' : it.getColor('plotBorderColor'),
                  ),
                  tt.plotborderthickness = p = (0, r.pluckNumber)(
                    rt.plotborderthickness,
                    1,
                  ),
                  tt.plotBorderDashStyle = k = ct
                    ? (0, r.getDashStyle)(c, h)
                    : 'none',
                  tt.showValues = (0, r.pluckNumber)(rt.showvalues, 1),
                  tt.definedGroupPadding = d(
                    (0, r.pluckNumber)(rt.plotspacepercent),
                    0,
                  ),
                  tt.plotSpacePercent = d(
                    (0, r.pluckNumber)(rt.plotspacepercent, 20) % 100,
                    0,
                  ),
                  tt.maxcolwidth = (0, r.pluckNumber)(rt.maxcolwidth, 50),
                  tt.plotpaddingpercent = (0, r.pluckNumber)(
                    rt.plotpaddingpercent,
                  ),
                  tt.placevaluesinside = (0, r.pluckNumber)(
                    rt.placevaluesinside,
                    0,
                  ),
                  tt.use3dlighting = (0, r.pluckNumber)(rt.use3dlighting, 1),
                  tt.parentYAxis = 0,
                  this.setState(
                    'visible',
                    1 === (0, r.pluckNumber)(at.visible, 1),
                  ),
                  this.setState('dirty', !0),
                  pt || (pt = this.components.data = []),
                  Z = 0;
                Z < nt;
                Z++
              )
                (Ct += q = f(gt.getCleanValue(ot[Z].value))),
                  (Dt[Z] = (0, r.extend2)({}, ot[Z])),
                  (Dt[Z].value = q);
              for (
                Dt.sort(function(t, e) {
                  return e.value - t.value;
                }),
                  tt.imageCount = 0,
                  Z = 0;
                Z < nt;
                Z++
              )
                (x = Dt[Z]),
                  (P = pt[Z]) || (P = pt[Z] = {graphics: {}}),
                  P.config || (w = pt[Z].config = {}),
                  null !== (A = f(gt.getCleanValue(x.value))) &&
                    ((w = P && P.config),
                    (K = et.getLabel(Z)),
                    (w.label = (0, r.getValidValue)(
                      (0, r.parseUnsafeString)((0, r.pluck)(K.label)),
                    )),
                    (w.showValue = (0, r.pluckNumber)(
                      x.showvalue,
                      tt.showValues,
                    )),
                    (w.setValue = A),
                    (w.setLink = (0, r.pluck)(x.link)),
                    (w.setDisplayValue = F = (0, r.parseUnsafeString)(
                      x.displayvalue,
                    )),
                    (_t += w.setValue),
                    (J = gt.dataLabels(A)),
                    (w.dataLabelStyle = this._configureDataLabelStyle(x)),
                    (w.shadow = {opacity: tt.showShadow ? b / 100 : 0}),
                    (U = (0, r.pluckNumber)(x.dashed)),
                    (j = (0, r.pluckNumber)(x.dashlen, c)),
                    (X = h = (0, r.pluckNumber)(x.dashgap, h)),
                    (w.plotBorderDashStyle = S =
                      1 === U
                        ? (0, r.getDashStyle)(j, X)
                        : 0 === U
                        ? 'none'
                        : k),
                    (st = it.getPlotColor(Z)),
                    (st = (0, r.pluck)(x.color, st)),
                    (C = (0, r.pluck)(x.ratio, tt.plotfillratio)),
                    (b = (0, r.pluck)(x.alpha, tt.plotfillalpha)),
                    (_ = (0, r.pluck)(x.alpha, tt.plotborderalpha)),
                    A < 0 && !g && ((l = m), (m = 360 - m)),
                    (w.colorArr = N = (0, r.getColumnColor)(
                      st + ',' + D,
                      b,
                      C,
                      m,
                      g,
                      y,
                      _.toString(),
                      0,
                      !!vt,
                    )),
                    0 !== v &&
                      ((M = (0, r.pluck)(
                        x.hovercolor,
                        rt.plotfillhovercolor,
                        rt.columnhovercolor,
                        st,
                      )),
                      (T = (0, r.pluck)(
                        x.hoveralpha,
                        rt.plotfillhoveralpha,
                        rt.columnhoveralpha,
                        b,
                      )),
                      !(B = (0, r.pluck)(
                        x.hovergradientcolor,
                        rt.plothovergradientcolor,
                        D,
                      )) && (B = ''),
                      (L = (0, r.pluck)(x.hoverratio, rt.plothoverratio, C)),
                      (I = (0, r.pluckNumber)(
                        360 - x.hoverangle,
                        360 - at.hoverangle,
                        360 - rt.plothoverangle,
                        m,
                      )),
                      (E = (0, r.pluck)(
                        x.borderhovercolor,
                        rt.plotborderhovercolor,
                        y,
                      )),
                      (O = (0, r.pluck)(
                        x.borderhoveralpha,
                        at.borderhoveralpha,
                        rt.plotborderhoveralpha,
                        rt.plotfillhoveralpha,
                        _,
                        b,
                      )),
                      (R = (0, r.pluckNumber)(
                        x.borderhoverthickness,
                        at.borderhoverthickness,
                        rt.plotborderhoverthickness,
                        p,
                      )),
                      (G = (0, r.pluckNumber)(
                        x.borderhoverdashed,
                        rt.plotborderhoverdashed,
                      )),
                      (V = (0, r.pluckNumber)(
                        x.borderhoverdashgap,
                        rt.plotborderhoverdashgap,
                        c,
                      )),
                      (z = (0, r.pluckNumber)(
                        x.borderhoverdashlen,
                        rt.plotborderhoverdashlen,
                        h,
                      )),
                      (H = G ? (0, r.getDashStyle)(z, V) : S),
                      1 === v && M === st && (M = (0, r.getLightColor)(M, 70)),
                      (W = (0, r.getColumnColor)(
                        M + ',' + B,
                        T,
                        L,
                        I,
                        g,
                        E,
                        O.toString(),
                        0,
                        !!vt,
                      )),
                      (w.setRolloutAttr = {
                        fill: vt
                          ? [(0, r.toRaphaelColor)(N[0]), !tt.use3dlighting]
                          : (0, r.toRaphaelColor)(N[0]),
                        stroke: e && (0, r.toRaphaelColor)(N[1]),
                        'stroke-width': p,
                        'stroke-dasharray': S,
                      }),
                      (w.setRolloverAttr = {
                        fill: vt
                          ? [(0, r.toRaphaelColor)(W[0]), !tt.use3dlighting]
                          : (0, r.toRaphaelColor)(W[0]),
                        stroke: e && (0, r.toRaphaelColor)(W[1]),
                        'stroke-width': R,
                        'stroke-dasharray': H,
                      })),
                    $ &&
                      et.updateTicksValues(Z, {
                        labelfontcolor: (0, r.convertColor)(st),
                      }),
                    (w.originalPlotColor = st),
                    (w.displayValue = (0, r.pluck)(F, J)),
                    (n = w.setTooltext = w.origToolText = (0, r.getValidValue)(
                      (0, r.parseUnsafeString)(
                        (0, r.pluck)(x.tooltext, rt.plottooltext),
                        !1,
                      ),
                    )),
                    (w.toolTipValue = gt.dataLabels(A, tt.parentYAxis)),
                    (w._x = Z),
                    (w._y = A),
                    (a = w.toolTipValue),
                    (mt = d(mt, A)),
                    (bt = u(bt, A)),
                    dt
                      ? (tt.showTooltip
                          ? void 0 !== n
                            ? ((o = {
                                formattedValue: a,
                                label: w.label,
                                yaxisName: ft,
                                xaxisName: ht,
                                cumulativeValue: _t,
                                cumulativeDataValue: gt.dataLabels(_t),
                                cumulativePercentValue: void 0,
                                sum: gt.dataLabels(Ct),
                                unformattedSum: Ct,
                              }),
                              (i = [1, 2, 3, 5, 6, 7, 20, 21, 22, 23, 24, 25]),
                              (s = (0, r.parseTooltext)(n, i, o, x, rt)))
                            : (s = w.label ? w.label + yt : '')
                          : (s = !1),
                        (w.toolText = s))
                      : (s = !1),
                    (w.toolText = s),
                    (w.tooltext = n),
                    (w.setTooltext = s),
                    l && (m = l));
              (tt.maxValue = mt), (tt.minValue = bt);
            }),
            e
          );
        })(i['default']);
        e.ParetoColumnDataset = h;
      },
      566: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = {
          'initial.dataset.paretoColumn': o(a(493))['default'][
            'initial.dataset.column'
          ],
        };
        e['default'] = n;
      },
      567: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e.ParetoLineDataset = void 0);
        var n = o(a(207)),
          r = o(a(509)),
          i = a(193),
          l = Math,
          s = l.min,
          c = l.max,
          u = l.abs,
          d = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            return (
              (0, n['default'])(e, t),
              (e.prototype.configureAttributes = function(t) {
                if (!t) return !1;
                this.trimData(t), (this.config.JSONData = t);
                var e,
                  a,
                  o,
                  n,
                  r,
                  l,
                  d,
                  f,
                  h,
                  p,
                  g,
                  v,
                  m = this.getFromEnv('chart'),
                  b = this.config,
                  C = this.getFromEnv('xAxis'),
                  D = b.JSONData,
                  _ = D.data,
                  y = _ && _.length,
                  S = this.getFromEnv('chart-attrib'),
                  k = this.getFromEnv('color-manager'),
                  x = (0, i.pluckNumber)(S.showtooltip, 1),
                  A = ((0, i.parseUnsafeString)(S.yaxisname),
                  (0, i.parseUnsafeString)(S.xaxisname),
                  this.components.data),
                  P = this.getFromEnv('number-formatter'),
                  w = m.config.is3D,
                  N = -Infinity,
                  F = +Infinity,
                  M = 0,
                  T = [],
                  B = 0,
                  L = (b.tootipSepChar = (0, i.pluck)(S.tooltipsepchar, ', '));
                for (
                  b.defaultPadding = {left: 0.5, right: 0.5},
                    b.enableAnimation = l = (0, i.pluckNumber)(
                      S.animation,
                      S.defaultanimation,
                      1,
                    ),
                    b.animation = !!l && {
                      duration:
                        1e3 * (0, i.pluckNumber)(S.animationduration, 1),
                    },
                    b.showTooltip = (0, i.pluckNumber)(S.showtooltip, 1),
                    b.valuePadding = (0, i.pluckNumber)(S.valuepadding, 2),
                    b.showTextOutline = (0, i.pluckNumber)(S.textoutline, 0),
                    b.rotateValues = (0, i.pluckNumber)(S.rotatevalues)
                      ? 270
                      : 0,
                    b.showHoverEffect = (0, i.pluckNumber)(
                      S.plothovereffect,
                      S.showhovereffect,
                      void 0,
                    ),
                    b.showShadow = w
                      ? (0, i.pluckNumber)(S.showshadow, 1)
                      : (0, i.pluckNumber)(
                          S.showshadow,
                          k.getColor('showShadow'),
                        ),
                    b.useDataPlotColorForLabels = (0, i.pluckNumber)(
                      S.usedataplotcolorforlabels,
                      0,
                    ),
                    b.use3dlineshift = (0, i.pluckNumber)(
                      S.use3dlineshift,
                      m.use3dlineshift,
                    ),
                    b.drawLine = 1,
                    b.linecolor = (0, i.getFirstColor)(
                      (0, i.pluck)(S.linecolor, k.getColor('plotBorderColor')),
                    ),
                    b.linethickness = (0, i.pluckNumber)(S.linethickness, 2),
                    b.linealpha = (0, i.pluck)(S.linealpha, '100'),
                    b.linedashed = (0, i.pluckNumber)(S.linedashed, 0),
                    b.linedashlen = (0, i.pluckNumber)(
                      D.linedashlen,
                      S.linedashlen,
                      5,
                    ),
                    b.linedashgap = (0, i.pluckNumber)(
                      D.linedashgap,
                      S.linedashgap,
                      4,
                    ),
                    d = (0, i.getDashStyle)(b.linedashlen, b.linedashgap),
                    b.lineDashStyle = b.linedashed ? d : 'none',
                    b.drawanchors = (0, i.pluckNumber)(
                      S.drawanchors,
                      S.showanchors,
                    ),
                    b.anchorbgcolor = (0, i.pluck)(
                      S.anchorbgcolor,
                      k.getColor('anchorBgColor'),
                    ),
                    b.anchorbordercolor = (0, i.pluck)(
                      S.anchorbordercolor,
                      b.linecolor,
                    ),
                    b.anchorradius = (0, i.pluckNumber)(S.anchorradius, 3),
                    b.anchoralpha = (0, i.pluck)(S.anchoralpha),
                    b.anchorbgalpha = (0, i.pluck)(S.anchorbgalpha, 100),
                    b.anchorborderthickness = (0, i.pluck)(
                      S.anchorborderthickness,
                      1,
                    ),
                    b.anchorsides = (0, i.pluck)(S.anchorsides, 0),
                    b.anchorimageurl = (0, i.pluck)(S.anchorimageurl),
                    b.anchorimagealpha = (0, i.pluckNumber)(
                      S.anchorimagealpha,
                      100,
                    ),
                    b.anchorimagescale = (0, i.pluckNumber)(
                      S.anchorimagescale,
                      100,
                    ),
                    b.anchorimagepadding = (0, i.pluckNumber)(
                      S.anchorimagepadding,
                      1,
                    ),
                    b.anchorstartangle = (0, i.pluckNumber)(
                      S.anchorstartangle,
                      90,
                    ),
                    b.parentYAxis = 1,
                    b.valuePosition = (0, i.pluck)(S.valueposition, 'auto'),
                    b.showvalues = b.showValues = (0, i.pluckNumber)(
                      S.showlinevalues,
                      S.showvalues,
                      1,
                    ),
                    this.setState(
                      'visible',
                      1 === (0, i.pluckNumber)(D.visible, 1),
                    ),
                    this.setState('dirty', !0),
                    b.shadow = {opacity: b.showShadow ? b.linealpha / 100 : 0},
                    b.showCumulativeLine = (0, i.pluckNumber)(
                      S.showcumulativeline,
                      1,
                    ),
                    b.maxRadius = -Infinity,
                    A || (A = this.components.data = []),
                    f = 0;
                  f < y;
                  f++
                )
                  (M += p = u(P.getCleanValue(_[f].value))),
                    (T[f] = (0, i.extend2)({}, _[f])),
                    (T[f].value = p);
                for (
                  T.sort(function(t, e) {
                    return e.value - t.value;
                  }),
                    b.imageCount = 0,
                    f = 0;
                  f < y;
                  f++
                )
                  (a = T[f]),
                    (n = A[f]) || (n = A[f] = {graphics: {}}),
                    n.config || (r = A[f].config = {}),
                    null !== (o = u(P.getCleanValue(a.value))) &&
                      ((r = n && n.config),
                      (g = C.getLabel(f)),
                      (r.label = (0, i.getValidValue)(
                        (0, i.parseUnsafeString)((0, i.pluck)(g.label)),
                      )),
                      (r.showValue = (0, i.pluckNumber)(
                        a.showvalue,
                        b.showValues,
                      )),
                      (r.setValue = o),
                      (r.setLink = (0, i.pluck)(a.link)),
                      (r.setDisplayValue = (0, i.parseUnsafeString)(
                        a.displayvalue,
                      )),
                      (B += r.setValue),
                      (r.dataLabelStyle = this._configureDataLabelStyle(a)),
                      (o = r.setValue = (B / M) * 100),
                      (h = P.percentValue(o)),
                      (r.toolTipValue = h),
                      (r.displayValue = h),
                      (r.valuePosition = (0, i.pluck)(
                        a.valueposition,
                        b.valuePosition,
                      )),
                      (r.anchorProps = this._parseAnchorProperties(f, T)),
                      (r.hoverEffects = this._parseHoverEffectOptions(n)),
                      (v = r.anchorProps),
                      (b.maxRadius = Math.max(
                        b.maxRadius,
                        v.radius + v.borderThickness / 2,
                      )),
                      (r._x = f),
                      (r._y = o),
                      r.toolTipValue,
                      (N = c(N, o)),
                      (F = s(F, o)),
                      x
                        ? ((e =
                            !!b.showTooltip &&
                            (r.label ? r.label + L + r.toolTipValue : '')),
                          (r.toolText = e))
                        : (e = !1),
                      (r.toolText = e),
                      (r.tooltext = void 0),
                      (r.setTooltext = e));
                (b.maxValue = N), (b.minValue = F);
              }),
              e
            );
          })(r['default']);
        e.ParetoLineDataset = d;
      },
      568: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              o,
              l = t.getFromEnv('chart-attrib'),
              s = (0, i.pluckNumber)(l.showcumulativeline, 1),
              c = t.getChildren('canvas')[0],
              u = c.getChildren('axisRefVisualCartesian')[0],
              d = {zoomable: !0, pannable: !0},
              f = t._feedAxesRawData(),
              h = function() {
                return u.asyncDraw();
              };
            (0, i.componentFactory)(t, r['default'], 'xAxis', 1, f.xAxisConf),
              (e = t.getChildren()),
              (o = e.xAxis[0]),
              u.setLinkedItem(o.getId(), o),
              c.attachAxis(o, !1, t.zoomX ? d : {}),
              o.setLinkedItem('canvas', c),
              (0, i.componentFactory)(
                t,
                n['default'],
                'yAxis',
                s ? 2 : 1,
                f.yAxisConf,
              ),
              (a = t.getChildren('yAxis')) &&
                a[1] &&
                a[1].setAxisConfig({
                  isPercent: !0,
                  drawLabels: !0,
                  drawPlotLines: !0,
                  drawAxisName: !0,
                  drawAxisLine: !0,
                  drawPlotBands: !0,
                  drawTrendLines: !0,
                  drawTrendLabels: !0,
                }),
              a.forEach(function(e) {
                !0 !== e.getState('removed')
                  ? (e.setLinkedItem('canvas', c),
                    u.setLinkedItem(e.getId(), e),
                    c.attachAxis(e, !0, t.zoomY ? d : {}),
                    u.setLinkedItem(e.getId(), e),
                    u.addExtEventListener('visiblerangeset', h, e))
                  : c.detachAxis(e);
              }),
              t._setCategories();
          });
        var n = o(a(435)),
          r = o(a(482)),
          i = a(193);
      },
      569: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              o,
              i = t.getChildren(),
              l = t.getFromEnv('chart-attrib'),
              s = i.canvas[0].getChildren('vCanvas'),
              c = t.getFromEnv('dataSource'),
              u = c.dataset,
              d = (0, r.pluckNumber)(l.showcumulativeline, 1),
              f = c.data || (u && u[0].data);
            if (((o = {data: f}), !(f && 0 !== f.length)))
              return void t.setChartMessage();
            (e = t.getDSdef('column')),
              t.config.is3D &&
                ((0, r.componentFactory)(
                  s[0],
                  n['default'],
                  'datasetGroup_column',
                ),
                (a = s[0].getChildren('datasetGroup_column')[0]));
            (0, r.datasetFactory)(a || s[0], e, 'dataset', 1, [o]),
              d &&
                ((e = t.getDSdef('line')),
                (0, r.datasetFactory)(s[1], e, 'dataset', 1, [o], [1]));
          });
        var n = o(a(502)),
          r = a(193);
      },
      570: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(571))['default'];
        e['default'] = n;
      },
      571: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(560)),
          i = a(193),
          l = a(572),
          s = a(567),
          c = o(a(497)),
          u = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).fireGroupEvent = !0),
                (e.defaultPlotShadow = 1),
                (e.isPercentage = !0),
                e.registerFactory('canvas', c['default']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Pareto3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Pareto3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = '3D Pareto Chart'),
                  (e.singleseries = !0),
                  (e.hasLegend = !1),
                  (e.defaultDatasetType = 'column3d'),
                  (e.plotfillalpha = i.preDefStr.NINETYSTRING),
                  (e.use3dlineshift = 1),
                  (e.enablemousetracking = !0),
                  (e.showzeroplaneontop = 0);
              }),
              (a.getDSdef = function(t) {
                return 'column' === t
                  ? l.ParetoColumn3DDataset
                  : s.ParetoLineDataset;
              }),
              e
            );
          })(r['default']);
        e['default'] = u;
      },
      572: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e.ParetoColumn3DDataset = void 0);
        var n = o(a(207)),
          r = a(565),
          i = a(505),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t);
            var a = e.prototype;
            return (
              (a._getHoveredPlot = function(t, e) {
                var a, o;
                return (
                  (a = this.getFromEnv('xAxis').getValue(t)),
                  (o = Math.round(a)) - a > 0
                    ? i._checkPointerOverColumn.call(this, o, t, e) ||
                      i._checkPointerOverColumn.call(this, o - 1, t, e)
                    : i._checkPointerOverColumn.call(this, o + 1, t, e) ||
                      i._checkPointerOverColumn.call(this, o, t, e)
                );
              }),
              (a.createContainer = function() {
                var t = this.getLinkedParent();
                !this.getContainer('labelGroup') &&
                  this.addContainer(
                    'labelGroup',
                    (function(t, e, a) {
                      return a
                        .getFromEnv('animationManager')
                        .setAnimation({
                          el: 'group',
                          attr: {name: t},
                          container: e,
                          state: 'appearing',
                          component: a,
                          label: 'group',
                        });
                    })(
                      'label-group',
                      t.getChildContainer('vcanvasLabelGroup'),
                      this,
                    ).attr('class', 'fusioncharts-datalabels'),
                  );
              }),
              e
            );
          })(r.ParetoColumnDataset);
        e.ParetoColumn3DDataset = l;
      },
      573: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(574))['default'];
        e['default'] = n;
      },
      574: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(575)),
          i = a(583),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).hasScroll = !0),
                (e.eiMethods = {scrollTo: i.scrollTo}),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollCombiDy2D';
              }),
              (e.includeInputOptions = function() {
                return ['SwipeGesture'];
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollCombiDy2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Dual Y-Axis Combination Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.showzeroplaneontop = 0),
                  (e.avgScrollPointWidth = 40),
                  (e.canvasborderthickness = 1);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e),
                  i.configurer.call(this, e);
              }),
              (a._setAxisScale = function() {
                i.setAxisScale.call(this);
              }),
              (a._resetViewPortConfig = function() {
                i.resetViewPortConfig.call(this);
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      575: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(561)),
          i = o(a(492)),
          l = o(a(510)),
          s = o(a(509)),
          c = o(a(576)),
          u = o(a(580)),
          d = o(a(582)),
          f = a(193),
          h = o(a(563)),
          p = f.preDefStr.SEVENTYSTRING,
          g = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).isDual = !0),
                e.registerFactory('dataset', h['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSCombidy2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSCombidy2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Multi-series Dual Y-Axis Combination Chart'),
                  (e.sDefaultDatasetType = 'line'),
                  (e.defaultDatasetType = 'column'),
                  (e.enablemousetracking = !0),
                  (e.isdual = 1),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = f.HUNDREDSTRING),
                  (e.anchorimagealpha = f.HUNDREDSTRING),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = p),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = f.HUNDREDSTRING),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0),
                  (e.showzeroplaneontop = 0);
              }),
              (a.getDSdef = function(t) {
                return 'splinearea' === t
                  ? c['default']
                  : 'spline' === t
                  ? u['default']
                  : 'area' === t
                  ? l['default']
                  : 'line' === t
                  ? s['default']
                  : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? d['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'splinearea' === t.toLowerCase()
                    ? 'splinearea'
                    : 'spline' === t.toLowerCase()
                    ? 'spline'
                    : 'area' === t.toLowerCase()
                    ? 'area'
                    : 'line' === t.toLowerCase()
                    ? 'line'
                    : 'column'
                );
              }),
              e
            );
          })(r['default']);
        e['default'] = g;
      },
      584: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(585))['default'];
        e['default'] = n;
      },
      585: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(586)),
          i = o(a(492)),
          l = o(a(510)),
          s = o(a(509)),
          c = o(a(576)),
          u = o(a(580)),
          d = o(a(582)),
          f = o(a(563)),
          h = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).hasScroll = !0),
                (e.defaultPlotShadow = 1),
                e.registerFactory('dataset', f['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollCombi2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollCombi2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Combination Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.zeroplanethickness = 1),
                  (e.zeroplanealpha = 80),
                  (e.enablemousetracking = !0),
                  (e.showzeroplaneontop = 0),
                  (e.defaultcrosslinethickness = null),
                  (e.avgScrollPointWidth = 40),
                  (e.canvasborderthickness = 1);
              }),
              (a.getDSdef = function(t) {
                return 'splinearea' === t
                  ? c['default']
                  : 'spline' === t
                  ? u['default']
                  : 'area' === t
                  ? l['default']
                  : 'line' === t
                  ? s['default']
                  : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? d['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'splinearea' === t.toLowerCase()
                    ? 'splinearea'
                    : 'spline' === t.toLowerCase()
                    ? 'spline'
                    : 'area' === t.toLowerCase()
                    ? 'area'
                    : 'line' === t.toLowerCase()
                    ? 'line'
                    : 'column'
                );
              }),
              e
            );
          })(r['default']);
        e['default'] = h;
      },
      586: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(587)),
          i = o(a(510)),
          l = a(193),
          s = l.preDefStr.SEVENTYSTRING,
          c = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).hasScroll = !0),
                (e.defaultPlotShadow = 0),
                (e.binSize = 0),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollArea2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollArea2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Multi-series Area Chart'),
                  (e.defaultDatasetType = 'scrollarea2d'),
                  (e.enablemousetracking = !0),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = l.HUNDREDSTRING),
                  (e.anchorimagealpha = l.HUNDREDSTRING),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = s),
                  (e.canvasborderthickness = 1),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = l.HUNDREDSTRING),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0),
                  (e.defaultcrosslinethickness = 1),
                  (e.avgScrollPointWidth = 75);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {}),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      587: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(588)),
          i = o(a(492)),
          l = o(a(582)),
          s = a(583),
          c = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).tooltipConstraint = 'plot'),
                (e.hasScroll = !0),
                (e.defaultPlotShadow = 1),
                (e.binSize = 0),
                (e.eiMethods.scrollTo = s.scrollTo),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollColumn2D';
              }),
              (e.includeInputOptions = function() {
                return ['SwipeGesture'];
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollColumn2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.defaultDatasetType = 'column'),
                  (e.showzeroplaneontop = 1),
                  (e.friendlyName = 'Scrollable Multi-series Column Chart'),
                  (e.avgScrollPointWidth = 40),
                  (e.canvasborderthickness = 1);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e),
                  s.configurer.call(this, e);
              }),
              (a._setAxisScale = function() {
                s.setAxisScale.call(this);
              }),
              (a.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e);
              }),
              (a._resetViewPortConfig = function() {
                s.resetViewPortConfig.call(this);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      589: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(590))['default'];
        e['default'] = n;
      },
      590: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(587)),
          i = o(a(591)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollStackedColumn2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollStackedColumn2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Stacked Column Chart'),
                  (e.isstacked = !0),
                  (e.showSum = 0),
                  (e.canvasborderthickness = 1),
                  (e.avgScrollPointWidth = 75);
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      593: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(594))['default'];
        e['default'] = n;
      },
      594: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(595)),
          i = a(583),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).hasScroll = !0),
                (e.eiMethods = {scrollTo: i.scrollTo}),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollMSStackedColumn2D';
              }),
              (e.includeInputOptions = function() {
                return ['SwipeGesture'];
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollMSStackedColumn2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.isstacked = !0),
                  (e.friendlyName =
                    'Scrollable MultiSeries Stacked Column Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.showzeroplaneontop = 1),
                  (e.avgScrollPointWidth = 75),
                  (e.canvasborderthickness = 1);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e),
                  i.configurer.call(this, e);
              }),
              e
            );
          })(r['default']);
        (l.prototype._setAxisScale = i.setAxisScale),
          (l.prototype._resetViewPortConfig = i.resetViewPortConfig);
        var s = l;
        e['default'] = s;
      },
      597: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(598))['default'];
        e['default'] = n;
      },
      598: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(599)),
          i = a(583),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).hasScroll = !0),
                (e.eiMethods = {scrollTo: i.scrollTo}),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollMSStackedColumn2DLineDY';
              }),
              (e.includeInputOptions = function() {
                return ['SwipeGesture'];
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollMSStackedColumn2DLineDY';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.isstacked = !0),
                  (e.friendlyName =
                    'Scrollable Multi-series Dual Y-Axis Stacked Column and Line Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.sDefaultDatasetType = 'line'),
                  (e.showzeroplaneontop = 1),
                  (e.avgScrollPointWidth = 75),
                  (e.canvasborderthickness = 1);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e),
                  i.configurer.call(this, e);
              }),
              (a._setAxisScale = function() {
                i.setAxisScale.call(this);
              }),
              (a._resetViewPortConfig = function() {
                i.resetViewPortConfig.call(this);
              }),
              e
            );
          })(r['default']);
        (l.prototype._setAxisScale = i.setAxisScale),
          (l.prototype._resetViewPortConfig = i.resetViewPortConfig);
        var s = l;
        e['default'] = s;
      },
      601: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(602))['default'];
        e['default'] = n;
      },
      602: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(603)),
          i = o(a(591)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollStackedBar2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollStackedBar2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Stacked Bar Chart'),
                  (e.isstacked = !0),
                  (e.avgScrollPointWidth = 75),
                  (e.canvasborderthickness = 1),
                  (e.showSum = 0);
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      603: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(518)),
          i = o(a(533)),
          l = o(a(582)),
          s = o(a(521)),
          c = a(583),
          u = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).isBar = !0),
                (e.eiMethods = {scrollTo: c.scrollTo}),
                (e.hasScroll = !0),
                e.registerFactory('dataset', s['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollBar2D';
              }),
              (e.includeInputOptions = function() {
                return ['SwipeGesture'];
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollBar2D';
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Multi-series Bar Chart'),
                  (e.hasLegend = !0),
                  (e.defaultDatasetType = 'bar2d'),
                  (e.avgScrollPointWidth = 40);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e),
                  c.configurer.call(this, e);
              }),
              (a._setAxisScale = function() {
                c.setAxisScale.call(this, 'bar2d');
              }),
              (a._resetViewPortConfig = function() {
                c.resetViewPortConfig.call(this);
              }),
              e
            );
          })(r['default']);
        e['default'] = u;
      },
      604: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(586))['default'];
        e['default'] = n;
      },
      605: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(606))['default'];
        e['default'] = n;
      },
      606: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(586)),
          i = o(a(509)),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.binSize = 0),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'ScrollLine2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'ScrollLine2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scrollable Multi-series Line Chart'),
                  (e.defaultDatasetType = 'line'),
                  (e.zeroplanethickness = 1),
                  (e.zeroplanealpha = 40),
                  (e.showzeroplaneontop = 0),
                  (e.enablemousetracking = !0),
                  (e.defaultcrosslinethickness = 1),
                  (e.avgScrollPointWidth = 75),
                  (e.canvasborderthickness = 1);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {}),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      607: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(587))['default'];
        e['default'] = n;
      },
      608: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(603))['default'];
        e['default'] = n;
      },
      609: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(610))['default'];
        e['default'] = n;
      },
      610: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(611)),
          i = o(a(619)),
          l = o(a(621)),
          s = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Bubble';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Bubble';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Bubble Chart'), (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      611: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(612)),
          i = o(a(616)),
          l = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).isXY = !0),
                (e.defaultZeroPlaneHighlighted = !1),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'Scatter';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'Scatter';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Scatter Chart'),
                  (e.hasLegend = !0),
                  (e.allowreversexaxis = !0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {}),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      619: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(616)),
          i = a(193),
          l = o(a(617)),
          s = a(201),
          c = o(a(620)),
          u = i.hasTouch ? i.TOUCH_THRESHOLD_PIXELS : i.CLICK_THRESHOLD_PIXELS,
          d = i.preDefStr.setRolloverAttrStr,
          f = i.preDefStr.setRolloutAttrStr,
          h = Math,
          p = h.round,
          g = h.min,
          v = h.max;
        (0, s.addDep)({
          name: 'bubbleAnimation',
          type: 'animationRule',
          extension: c['default'],
        });
        var m = (function(t) {
          function e() {
            return t.apply(this, arguments) || this;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'bubble';
            }),
            (a.configureAttributes = function(t) {
              if (!t) return !1;
              this.trimData(t), (this.config.JSONData = t);
              var e,
                a,
                o,
                n,
                r,
                l,
                s,
                c,
                u,
                d,
                f,
                h,
                p,
                m,
                b,
                C,
                D,
                _,
                y,
                S,
                k,
                x,
                A,
                P = this.getFromEnv('chart'),
                w = P.getFromEnv('dataSource').chart,
                N = this.config.JSONData,
                F = this.config,
                M = N.data || [],
                T = this.getFromEnv('color-manager'),
                B = this.index,
                L = this.getFromEnv('number-formatter'),
                I = (0, i.pluck)(
                  (0, i.parseUnsafeString)(w.tooltipsepchar),
                  ', ',
                ),
                E = -Infinity,
                O = +Infinity,
                R = E,
                G = O,
                V = E,
                z = O,
                H = E,
                W = O;
              for (
                F.seriesname = (0, i.parseUnsafeString)(N.seriesname),
                  F.includeinlegend = (0, i.pluckNumber)(
                    N.includeinlegend,
                    F.seriesname ? 1 : 0,
                  ),
                  F.anchorBgColor = (0, i.getFirstColor)(
                    (0, i.pluck)(
                      N.color,
                      N.plotfillcolor,
                      w.plotfillcolor,
                      T.getPlotColor(B),
                    ),
                  ),
                  F.showPlotBorder = (0, i.pluckNumber)(
                    N.showplotborder,
                    w.showplotborder,
                    1,
                  ),
                  F.anchorBorderThickness = F.showPlotBorder
                    ? (0, i.pluckNumber)(
                        N.plotborderthickness,
                        w.plotborderthickness,
                        1,
                      )
                    : 0,
                  F.anchorBorderColor = (0, i.getFirstColor)(
                    (0, i.pluck)(
                      N.plotbordercolor,
                      w.plotbordercolor,
                      '666666',
                    ),
                  ),
                  F.plotFillAlpha = (0, i.pluck)(
                    N.plotfillalpha,
                    N.bubblefillalpha,
                    w.plotfillalpha,
                    '100',
                  ),
                  F.plotBorderAlpha = (0, i.pluck)(
                    N.plotborderalpha,
                    w.plotborderalpha,
                    '95',
                  ),
                  F.negativeColor = (0, i.pluck)(w.negativecolor, 'FF0000'),
                  F.is3d =
                    0 !== (0, i.pluckNumber)(w.use3dlighting, N.is3d, w.is3d),
                  F.bubbleScale = (0, i.pluckNumber)(w.bubblescale, 1),
                  F.showTextOutline = (0, i.pluckNumber)(w.textoutline, 0),
                  F.minBubbleRadius = (0, i.pluckNumber)(w.minbubbleradius),
                  F.minRadiusForValue = (0, i.pluckNumber)(
                    N.minradiusforvalue,
                    w.minradiusforvalue,
                    0,
                  ),
                  F.clipBubbles = (0, i.pluckNumber)(w.clipbubbles, 1),
                  F.enableAnimation = c = (0, i.pluckNumber)(
                    w.animation,
                    w.defaultanimation,
                    1,
                  ),
                  F.animation = !!c && {
                    duration: 1e3 * (0, i.pluckNumber)(w.animationduration, 1),
                  },
                  F.showTooltip = (0, i.pluckNumber)(w.showtooltip, 1),
                  F.transposeAnimation = (0, i.pluckNumber)(
                    w.transposeanimation,
                    c,
                  ),
                  F.transposeAnimDuration =
                    1e3 * (0, i.pluckNumber)(w.transposeanimduration, 0.2),
                  F.seriesNameInTooltip = (0, i.pluckNumber)(
                    w.seriesnameintooltip,
                    1,
                  ),
                  F.rotateValues = (0, i.pluckNumber)(w.rotatevalues) ? 270 : 0,
                  F.showHoverEffect = (0, i.pluckNumber)(
                    w.plothovereffect,
                    w.showhovereffect,
                    void 0,
                  ),
                  F.showValues = F.showvalues = (0, i.pluckNumber)(
                    N.showvalues,
                    w.showvalues,
                    0,
                  ),
                  n = this.components.data =
                    this.components.data || (this.components.data = []),
                  e = M.length,
                  F.fillColor = F.is3d
                    ? (0, i.toRaphaelColor)(
                        (0, i.getPointColor)(F.anchorBgColor, F.plotFillAlpha),
                      )
                    : (0, i.toRaphaelColor)({
                        color: F.anchorBgColor,
                        alpha: F.plotFillAlpha,
                      }),
                  F.strokeColor = (0, i.toRaphaelColor)({
                    color: F.anchorBorderColor,
                    alpha: F.plotFillAlpha,
                  }),
                  a = 0;
                a < e;
                a++
              )
                if (
                  ((u = M[a]),
                  !(o = n[a] = n[a] || (n[a] = {})).graphics &&
                    (o.graphics = {}),
                  ((d = o.config = {}).x = L.getCleanValue(u.x)),
                  (d.y = L.getCleanValue(u.y)),
                  (d.z = L.getCleanValue(u.z, !0)),
                  (d.setValue = {x: d.x, y: d.y, z: d.z}),
                  (d.dataLabelStyle = this._configureDataLabelStyle(u)),
                  (d._x = d.x),
                  (d._y = d.y),
                  (d._z = d.z),
                  (d.showValue = (0, i.pluckNumber)(
                    u.showvalue,
                    F.showValues,
                    0,
                  )),
                  (d.plotShowValue = (0, i.pluckNumber)(u.showvalue)),
                  (d.plotMinRadiusForValue = (0, i.pluckNumber)(
                    u.minradiusforvalue,
                    F.minRadiusForValue,
                  )),
                  (d.anchorProps = {}),
                  (C = d.label = d.x),
                  (d.setLink = (0, i.getValidValue)(u.link)),
                  (F.max = H = v(H, d.z || 0)),
                  (F.min = W = g(W, d.z || 0)),
                  (d.is3d = 0 !== (0, i.pluckNumber)(u.is3d, F.is3d)),
                  (R = v(R, d.x)),
                  (G = g(G, d.x)),
                  (V = v(V, d.y)),
                  (z = g(z, d.y)),
                  (r = d.color = (0, i.getFirstColor)(
                    (0, i.pluck)(
                      u.color,
                      u.z < 0 ? F.negativeColor : F.anchorBgColor,
                    ),
                  )),
                  (l = d.alpha = (0, i.pluck)(u.alpha, F.plotFillAlpha)),
                  (d.colorObj = k = d.is3d
                    ? (0, i.getPointColor)(r, l)
                    : {color: r, alpha: l}),
                  (d.setDisplayValue = D = (0, i.parseUnsafeString)(
                    (0, i.pluck)(u.displayvalue, u.name, u.label),
                  )),
                  (s = d.formatedVal = null === d.y ? d.y : L.dataLabels(d.y)),
                  (d.displayValue = (0, i.pluck)(D, d.formatedVal)),
                  (d.setTooltext = (0, i.getValidValue)(
                    (0, i.parseUnsafeString)(
                      (0, i.pluck)(u.tooltext, N.plottooltext, w.plottooltext),
                      !1,
                    ),
                  )),
                  F.showTooltip
                    ? null === s
                      ? (f = !1)
                      : void 0 !== d.setTooltext
                      ? ((b = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 118]),
                        (m = {
                          yDataValue: s,
                          xDataValue: L.xAxis(C),
                          yaxisName: (0, i.parseUnsafeString)(w.yaxisname),
                          xaxisName: (0, i.parseUnsafeString)(w.xaxisname),
                          zDataValue: L.dataLabels(d.z),
                        }),
                        (f = (0, i.parseTooltext)(
                          d.setTooltext,
                          b,
                          m,
                          u,
                          w,
                          N,
                        )))
                      : (F.seriesNameInTooltip &&
                          (p = (0, i.getFirstValue)(N && N.seriesname)),
                        (f = p ? p + I : i.BLANKSTRING),
                        (f += C ? L.xAxis(C) + I : i.BLANKSTRING),
                        (f += s),
                        (f += u.z ? I + L.formatValue(u.z) : i.BLANKSTRING))
                    : (f = !1),
                  (d.toolText = f),
                  (h = d.hoverEffects = {}),
                  0 !== F.showHoverEffect)
                ) {
                  if (
                    ((x = h.enabled =
                      void 0 !==
                      (0, i.pluck)(
                        u.hoveralpha,
                        N.hoveralpha,
                        w.bubblehoveralpha,
                        u.hovercolor,
                        N.hovercolor,
                        N.bubblehovercolor,
                        w.bubblehovercolor,
                        u.borderhovercolor,
                        N.borderhovercolor,
                        w.plotborderhovercolor,
                        u.borderhoveralpha,
                        N.borderhoveralpha,
                        w.plotborderhoveralpha,
                        u.hoverscale,
                        N.bubblehoverscale,
                        w.bubblehoverscale,
                        u.borderhovercolor,
                        N.borderhovercolor,
                        w.plotborderhovercolor,
                        u.borderhoverthickness,
                        N.borderhoverthickness,
                        w.plotborderhoverthickness,
                        u.negativehovercolor,
                        N.negativeColor,
                        w.negativecolor,
                        u.is3donhover,
                        w.plotfillhovercolor,
                        N.is3donhover,
                        w.is3donhover,
                        void 0,
                      )),
                    (h.negativeColor = (0, i.pluck)(
                      u.negativehovercolor,
                      N.negativehovercolor,
                      w.negativehovercolor,
                      F.negativeColor,
                    )),
                    (h.is3d = (0, i.pluckNumber)(
                      u.is3donhover,
                      N.is3donhover,
                      w.is3donhover,
                      d.is3d,
                    )),
                    (h.color = (0, i.pluck)(
                      u.hovercolor,
                      N.hovercolor,
                      N.bubblehovercolor,
                      w.plotfillhovercolor,
                      w.bubblehovercolor,
                      d.is3d ? k.FCcolor.color : r,
                    )),
                    (h.color =
                      h.negativeColor && u.z < 0 ? h.negativeColor : h.color),
                    (h.scale = (0, i.pluck)(
                      u.hoverscale,
                      N.hoverscale,
                      N.bubblehoverscale,
                      w.bubblehoverscale,
                      1,
                    )),
                    (h.color = (0, i.getFirstColor)(h.color)),
                    (d.hoverColor = h.color),
                    (h.alpha = (0, i.pluck)(
                      u.hoveralpha,
                      N.hoveralpha,
                      w.plotfillhoveralpha,
                      w.bubblehoveralpha,
                      l,
                    )),
                    (h.borderColor = (0, i.pluck)(
                      u.borderhovercolor,
                      N.borderhovercolor,
                      w.plotborderhovercolor,
                      F.anchorBorderColor,
                    )),
                    (h.borderAlpha = (0, i.pluck)(
                      u.borderhoveralpha,
                      N.borderhoveralpha,
                      w.plotborderhoveralpha,
                      h.alpha,
                      F.plotBorderAlpha,
                    )),
                    (h.borderThickness = (0, i.pluckNumber)(
                      u.borderhoverthickness,
                      N.borderhoverthickness,
                      w.plotborderhoverthickness,
                      F.anchorBorderThickness,
                    )),
                    (h.color = h.is3d
                      ? (0, i.getPointColor)(h.color, h.alpha)
                      : {FCcolor: {color: h.color, alpha: h.alpha}}),
                    1 === (x && F.showHoverEffect ? 0 : F.showHoverEffect))
                  ) {
                    for (
                      S = (A = (_ = 'string' == typeof h.color)
                        ? h.color.split(/\s{0,},\s{0,}/)
                        : h.color.FCcolor.color.split(/\s{0,},\s{0,}/)).length,
                        y = 0;
                      y < S;
                      y++
                    )
                      A[y] = (0, i.getLightColor)(A[y], 70);
                    _
                      ? (h.color = A.join(','))
                      : (h.color.FCcolor.color = A.join(','));
                  }
                  !1 === x && (h.enabled = Boolean(F.showHoverEffect));
                } else h.enabled = !1;
              (F.xMax = R),
                (F.xMin = G),
                (F.yMin = z),
                (F.yMax = V),
                this.setState('dirty', !0),
                this.setState(
                  'visible',
                  1 ===
                    (0, i.pluckNumber)(
                      N.visible,
                      !Number(N.initiallyhidden),
                      1,
                    ),
                ),
                P.config.showLegend && this._addLegend(),
                this.setState('dirty', !0);
            }),
            (a._getHoveredPlot = function(t, e) {
              var a = this.config.dataTree.getNeighbour(
                {x: t, y: e},
                !0,
                'circle',
              );
              if (a)
                return {
                  pointIndex: a.index || a.i,
                  hovered: !0,
                  pointObj: a.data,
                };
            }),
            (a._hoverPlotAnchor = function(t, e, a) {
              var o = this.getFromEnv('animationManager'),
                n = t.graphics.element,
                r = 'DataPlotRollOut' === e ? n.data(f) : n.data(d);
              a &&
                n &&
                (o.setAnimationState &&
                  o.setAnimationState(
                    'DataPlotRollOut' === e ? 'mouseOut' : 'mouseOver',
                  ),
                o.setAnimation({el: n, attr: r, component: this}));
            }),
            (a._addLegend = function() {
              var t,
                e,
                a = this.getFromEnv('chart'),
                o = this.config,
                n = a.getChildren('legend')[0];
              o.includeinlegend
                ? ((e = {
                    enabled: o.includeInLegend,
                    anchorSide: 1,
                    type: this.type,
                    label: o.seriesname,
                  }),
                  (t = n.getItem(this.config.legendItemId))
                    ? t.configure({
                        style: n.config.itemStyle,
                        hiddenStyle: n.config.itemHiddenStyle,
                        datasetVisible: n.config.datasetVisible,
                        hoverStyle: n.config.itemHoverStyle,
                      })
                    : ((this.config.legendItemId = n.createItem(this)),
                      (t = n.getItem(this.config.legendItemId)),
                      this.addExtEventListener(
                        'fc-click',
                        function() {
                          t.itemClickFn();
                        },
                        t,
                      )),
                  t.configure(e),
                  t.setStateCosmetics('default', {
                    symbol: {
                      fill: o.fillColor,
                      rawFillColor: o.anchorBgColor,
                      rawStrokeColor: o.anchorBorderColor,
                      stroke: o.strokeColor,
                    },
                  }),
                  this.getState('visible')
                    ? t.removeLegendState('hidden')
                    : t.setLegendState('hidden'))
                : this.config.legendItemId &&
                  n.disposeItem(this.config.legendItemId);
            }),
            (a.getBubbleRadius = function(t) {
              var e,
                a = h.sqrt,
                o = this.config,
                n = o.bubbleScale,
                r = o.minBubbleRadius,
                i = this.getFromEnv('chartConfig'),
                l = g(i.canvasHeight, i.canvasWidth) / 8,
                s = a(this.getLinkedParent().getDataLimitRange().zMax),
                c = a(t);
              return (e = p((c * l) / s) * n || 0), r && (e = v(e, r)), e;
            }),
            (a.createCoordinates = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                l = this.components,
                s = l.data,
                c = this.getFromEnv('yAxis'),
                u = c.getAxisBase(),
                d = c.getPixel(u),
                f = this.getFromEnv('xAxis'),
                h = f.config.isVertical,
                p = s.length,
                g = l.data;
              for (o = 0; o < p; o++)
                (e = (t = g[o]) && t.config),
                  void 0 !== t &&
                    ((a = e._b),
                    (n = f.getPixel(e._x)),
                    (r = c.getPixel(e._y)),
                    (i = a ? c.getPixel(a) : d),
                    'bubble' === this.getName() &&
                      ((e.r = this.getBubbleRadius(e._z)),
                      (e.showValue =
                        void 0 !== e.plotShowValue
                          ? +e.plotShowValue
                          : e.r >= e.plotMinRadiusForValue &&
                            this.config.showValues)),
                    h
                      ? ((e._Px = r), (e._Py = n), (e._Pby = r), (e._Pbx = i))
                      : ((e._Px = n), (e._Py = r), (e._Pby = i), (e._Pbx = n)));
            }),
            (a.parsePlotAttributes = function(t, e) {
              var a,
                o,
                n,
                r,
                l,
                s,
                c,
                d,
                f,
                h,
                p,
                g,
                m,
                b = this.config.JSONData,
                C = this.getFromEnv('chart').config,
                D = this.config,
                _ = e,
                y = this.getState('visible'),
                S = D.anchorBorderThickness;
              (r = t.config),
                (s = (0, i.pluckNumber)(r.x, _)),
                (c = r.y),
                (d = r.z),
                (f = r.setLink),
                (h = r.displayValue),
                (l = r.toolText),
                (r.finalTooltext = r.toolText),
                (p = r.hoverEffects),
                null !== c &&
                  (((m = r.eventArgs || (r.eventArgs = {})).index = _),
                  (m.link = f),
                  (m.value = c),
                  (m.y = c),
                  (m.x = s),
                  (m.z = d),
                  (m.displayValue = h),
                  (m.toolText = l),
                  (m.id = this.userID),
                  (m.datasetIndex = this.config.index),
                  (m.datasetName = b.seriesname),
                  (m.visible = y),
                  (m.color = r.color),
                  (m.alpha = r.alpha),
                  (m.is3dOnHover = p.is3d),
                  (m.hoverScale = p.scale),
                  (m.use3dLighting = r.is3d),
                  (m.hoverColor = r.hoverColor),
                  (m.hoverAlpha = p.alpha),
                  (o = r._Py),
                  (n = r._Px),
                  (a = r.r),
                  [].push({x: n, y: o, r: a}),
                  (g = r.setRolloutAttr = {
                    fill: (0, i.toRaphaelColor)(r.colorObj),
                    'stroke-width': D.anchorBorderThickness,
                    stroke: (0, i.toRaphaelColor)({
                      color: D.anchorBorderColor,
                      alpha: D.plotBorderAlpha,
                    }),
                    r: a,
                  }),
                  !1 !== p.enabled &&
                    (r.setRolloverAttr = {
                      fill: (0, i.toRaphaelColor)(p.color),
                      'stroke-width': p.borderThickness,
                      stroke: (0, i.toRaphaelColor)({
                        color: p.borderColor,
                        alpha: p.borderAlpha,
                      }),
                      r: a * p.scale,
                    }),
                  (r.props = {
                    element: {
                      attr: {
                        cx: n,
                        cy: y ? o : C.canvasBottom + a,
                        r: a || 0,
                        fill: (0, i.toRaphaelColor)(r.colorObj),
                        'stroke-width': D.anchorBorderThickness,
                        visibility: y,
                        stroke: g.stroke,
                      },
                    },
                  }),
                  r.trackerConfig || (r.trackerConfig = {}),
                  (r.trackerConfig.trackerRadius = v(a + (S || 0), u)),
                  (t._xPos = n),
                  (t._yPos = o));
            }),
            (a.allocatePosition = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                s = this.components.data,
                c = [];
              for (this.createCoordinates(), e = 0, a = s.length; e < a; e += 1)
                (t = s[e]),
                  this.parsePlotAttributes(t, e),
                  this.parseLabelAttributes(t, e),
                  t &&
                    ((o = (r = t.config)._Px),
                    (n = r._Py),
                    (i = r.r || 0),
                    c.push({x: o, y: n, index: e, data: t, r: i}));
              this.config.dataTree = new l['default']().buildKdTree(c);
            }),
            (a.getCanvasPadding = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                l,
                s,
                c,
                u,
                d,
                f,
                h,
                p,
                v = this.config || (this.config = {}),
                m = this.components || {},
                b = this.getFromEnv('chartConfig'),
                C = b.rotatevalues,
                D = this.getFromEnv('xAxis'),
                _ = this.getFromEnv('dataLabelStyle'),
                y = m.data || [],
                S = y.length,
                k = v.leftMostData || y[0],
                x = v.rightMostData || y[y.length - 1],
                A = g(b.canvasHeight, b.canvasWidth) / 8,
                P = 1,
                w = 1,
                N = b.zMax,
                F = v.bubbleScale,
                M = D.config.axisRange,
                T = M.max,
                B = M.min,
                L = D.getPixel(T),
                I = D.getPixel(B),
                E = {},
                O = {},
                R = this.getFromEnv('smartLabel'),
                G = {paddingLeft: 0, paddingRight: 0},
                V = 0;
              for (t = A / Math.sqrt(N), l = 0; l < S; l++)
                (e = y[l].config),
                  (a = k.config),
                  (o = x.config),
                  (r = Math.sqrt(e.z)),
                  (f = Math.round(r * t) * F || 0),
                  (h = D.getValue(f) - B),
                  (s = e.x - h / 2),
                  1 === P &&
                    ((r = Math.sqrt(a.z)),
                    (f = Math.round(r * t) * F || 0),
                    (h = D.getValue(f) - B),
                    (c = a.x - h / 2)),
                  1 === w &&
                    ((r = Math.sqrt(o.z)),
                    (f = Math.round(r * t) * F || 0),
                    (h = D.getValue(f) - B),
                    (u = o.x - h / 2)),
                  (P = 0),
                  (w = 0),
                  c > s && ((k = y[l]), (P = 1)),
                  u < s && ((x = y[l]), (w = 1));
              return (
                R.useEllipsesOnOverflow(b.useEllipsesWhenOverflow),
                R.setStyle(_),
                k &&
                  k.config.showValue &&
                  ((d = (n = k.config).displayValue),
                  (O = R.getOriSize(d)),
                  (V = C ? O.height : O.width),
                  I > (i = D.getPixel(n.x) - 0.5 * V) &&
                    (G.paddingLeft = I - i)),
                x &&
                  x.config.showValue &&
                  ((d = (n = x.config).displayValue),
                  (E = R.getOriSize(d)),
                  (V = C ? E.height : E.width),
                  L < (p = D.getPixel(n.x) + 0.5 * V) &&
                    (G.paddingRight = p - L)),
                G
              );
            }),
            (a.drawPlots = function() {
              var t,
                e,
                a,
                o,
                n,
                r,
                i,
                l,
                s,
                c = this,
                u = c.getFromEnv('animationManager'),
                h = c.components.data,
                p = c.getContainer(),
                g = c.getState('visible'),
                v = c.getContainer('labelGroup'),
                m = function() {
                  !1 === g &&
                    (p.plotGroup.hide(),
                    p.commonElemsGroup.hide(),
                    v && v.hide(),
                    (c._containerHidden = !0));
                },
                b = {};
              for (n = 0, r = h.length; n < r; n += 1)
                (l = (i = (o = h[n]).config).y),
                  (t = o.graphics.element),
                  (b = i.hoverEffects),
                  (a = o.graphics.hotElement),
                  (s = o.graphics.label),
                  null !== l
                    ? ((e = o.graphics.element),
                      (t = u.setAnimation({
                        el: e || 'circle',
                        attr: i.props.element.attr,
                        label: 'circle',
                        callback: m,
                        component: c,
                        container: p.plotGroup,
                      })),
                      e || (o.graphics.element = t),
                      t.show(),
                      t
                        .data('hoverEnabled', b.enabled)
                        .data(d, i.setRolloverAttr)
                        .data(f, i.setRolloutAttr)
                        .data('anchorRadius', i.r)
                        .data('anchorHoverRadius', i.r),
                      t && t.data('eventArgs', i && i.eventArgs))
                    : (t && t.hide(), a && a.hide(), s && s.hide()),
                  t && (t.isDrawn = !0);
            }),
            (a.getDataLimits = function() {
              var t = this.getFromEnv('chart').config,
                e = this.config,
                a = e.yMax,
                o = e.yMin,
                n = -Infinity,
                r = +Infinity,
                i = t.transposeAxis,
                l = e.xMin,
                s = e.xMax,
                c = e.max,
                u = e.min,
                d = this.getRegressionPoints();
              return (
                !1 === this.getState('visible') &&
                  i &&
                  ((a = n), (o = r), (l = r), (s = n)),
                d &&
                  ((a = Math.max(a, d.max)),
                  (o = Math.min(o, d.min)),
                  (s = Math.max(s, d.xMax)),
                  (l = Math.min(l, d.xMin))),
                {max: a, min: o, xMin: l, xMax: s, zMax: c, zMin: u}
              );
            }),
            e
          );
        })(r['default']);
        e['default'] = m;
      },
      620: function(t, e, a) {
        'use strict';
        (e.__esModule = !0), (e['default'] = void 0);
        e['default'] = {
          'initial.dataset.bubble': function() {
            return {
              'circle.appearing': function(t) {
                return [
                  {
                    initialAttr: {cx: t.attr.cx, cy: t.attr.cy, r: 0},
                    slot: 'plot',
                  },
                ];
              },
              'group.appearing': function(t) {
                return 'label-group' === t.attr.name
                  ? [
                      {
                        initialAttr: {opacity: 0},
                        finalAttr: {opacity: 1},
                        slot: 'final',
                      },
                    ]
                  : [
                      {
                        initialAttr: {opacity: 1},
                        finalAttr: {opacity: 1},
                        slot: 'final',
                      },
                    ];
              },
              '*': null,
            };
          },
        };
      },
      621: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = a(208),
          i = a(193),
          l = (function(t) {
            function e() {
              var e;
              return (e = t.call(this) || this).setState('visible', !0), e;
            }
            (0, n['default'])(e, t);
            var a = e.prototype;
            return (
              (a.createContainer = function() {
                var t,
                  e,
                  a = this.getFromEnv('animationManager'),
                  o = this.getLinkedParent().getChildContainer();
                for (t in o)
                  (e = o[t]),
                    !this.getChildContainer(t) &&
                      this.addChildContainer(
                        t,
                        a.setAnimation({
                          el: 'group',
                          attr: {name: 'manager-' + t},
                          component: this,
                          container: e,
                        }),
                      );
              }),
              (a.draw = function() {
                this.createContainer();
              }),
              (a.getDataLimitRange = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r = this.getChildren(),
                  i = -Infinity,
                  l = +Infinity,
                  s = -Infinity,
                  c = +Infinity;
                for (e in r)
                  if (r.hasOwnProperty(e) && (a = r[e]) instanceof Array)
                    for (o = a.length, t = 0; t < o; t++)
                      a[t].getState('removed') ||
                        ((n = a[t].getDataLimits()),
                        (s = Math.max(s, n.xMax || -Infinity)),
                        (c = Math.min(c, n.xMin || +Infinity)),
                        (i = Math.max(i, n.zMax || -Infinity)),
                        (l = Math.min(l, n.zMin || +Infinity)));
                return {
                  xMax: s,
                  xMin: c,
                  zMax: (i = i === -Infinity ? 0 : i),
                  zMin: (l = l === +Infinity ? 0 : l),
                };
              }),
              (a.childChanged = function(t) {
                void 0 === t && (t = {});
                var e,
                  a,
                  o,
                  n = this.config,
                  r = this.getLinkedParent(),
                  i = {};
                (!1 === t.hide && !1 === t.show) ||
                  (this._mapChildren(function(t) {
                    t.setState('dirty', !0);
                  }),
                  (o = !0)),
                  !1 !== t.dataLimitChanged &&
                    (((e = this.getDataLimits()).min === n.range.min &&
                      e.max === n.range.max) ||
                      ((n.range.min = e.min),
                      (n.range.max = e.max),
                      (i.dataLimitChanged = !0),
                      (o = !0))),
                  !1 !== t.paddingChanged &&
                    (((a = this.getAxisValuePadding()).left ===
                      n.padding.left &&
                      a.right === n.padding.right) ||
                      ((n.padding.left = a.left),
                      (n.padding.right = a.right),
                      (i.paddingChanged = !0),
                      (o = !0))),
                  o ? r.childChanged && r.childChanged(i) : this.asyncDraw();
              }),
              (a.getAxisValuePadding = function() {
                var t = {},
                  e = -Infinity,
                  a = -Infinity;
                return (
                  this._mapChildren(function(o) {
                    o.getState('removed') ||
                      !1 === o.getState('visible') ||
                      ((t =
                        (o.getAxisValuePadding && o.getAxisValuePadding()) ||
                        {}),
                      (e = Math.max(e, t.left || -Infinity)),
                      (a = Math.max(a, t.right || -Infinity)));
                  }),
                  e === -Infinity && (e = 0),
                  a === -Infinity && (a = 0),
                  this.config.padding ||
                    ((this.config.padding = {}),
                    (this.config.padding.left = e),
                    (this.config.padding.right = a)),
                  {left: e, right: a}
                );
              }),
              (a.getCanvasPadding = function() {
                var t,
                  e,
                  a = {
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  };
                return (
                  this._mapChildren(function(o) {
                    if (!o.getState('removed'))
                      for (e in (t =
                        (o.getCanvasPadding && o.getCanvasPadding()) || {}))
                        t.hasOwnProperty(e) && (a[e] = Math.max(t[e], a[e]));
                  }),
                  a
                );
              }),
              (a.getDataLimits = function() {
                var t,
                  e,
                  a,
                  o = this.getFromEnv('chart'),
                  n = -Infinity,
                  r = +Infinity,
                  l = n,
                  s = r,
                  c = r,
                  u = n;
                return (
                  this._mapChildren(function(o) {
                    var d;
                    o.getDataLimits &&
                      !o.getState('removed') &&
                      ((t = o.getDataLimits()),
                      (d = t),
                      (e = (0, i.pluck)(d.xMax, n)),
                      (a = (0, i.pluck)(d.xMin, r)),
                      (l = Math.max(l, d.max)),
                      (s = Math.min(s, d.min)),
                      (u = Math.max(u, e)),
                      (c = Math.min(c, a)));
                  }),
                  l === -Infinity && (l = 0),
                  s === +Infinity && (s = 0),
                  this.config.range ||
                    ((this.config.range = {}),
                    (this.config.range.min = s),
                    (this.config.range.max = l),
                    (this.config.range.xMin = c),
                    (this.config.range.xMax = u)),
                  (o.config.yMax = l),
                  (o.config.yMin = s),
                  {min: s, max: l, xMin: c, xMax: u}
                );
              }),
              (a.isVisible = function() {
                return !this.isNotVisible;
              }),
              (a.getType = function() {
                return 'manager';
              }),
              (a.getName = function() {
                return 'BubbleGroupManager';
              }),
              (a.remove = function() {
                this._mapChildren(function(t) {
                  t.getState('removed') || t.remove();
                }),
                  t.prototype.remove.call(this);
              }),
              e
            );
          })(r.ComponentInterface);
        e['default'] = l;
      },
      622: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(611))['default'];
        e['default'] = n;
      },
      623: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(595))['default'];
        e['default'] = n;
      },
      624: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(625))['default'];
        e['default'] = n;
      },
      625: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(626)),
          i = o(a(591)),
          l = a(193),
          s = o(a(199)),
          c = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedArea2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedArea2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Stacked Area Chart'),
                  (e.plotfillalpha = l.HUNDREDSTRING),
                  (e.showSum = 0),
                  (e.isstacked = 1),
                  this.addToEnv('useImprovedLabelPlacement', !0),
                  this.addToEnv('useLinePlotGroupForAnchorPlacement', !0);
              }),
              (a.configureAttributes = function(e) {
                t.prototype.configureAttributes.call(this, e);
                var a = this.config,
                  o = this.getFromEnv('chart-attrib');
                (a.showSum = (0, s['default'])(o.showsum, a.showSum)),
                  a.showSum &&
                    (a.valueposition = (0, l.parseUnsafeString)(
                      (0, l.pluck)(o.valueposition, 'below'),
                    ));
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      628: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(629))['default'];
        e['default'] = n;
      },
      629: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(630)),
          i = o(a(591)),
          l = o(a(538)),
          s = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedBar3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedBar3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = '3D Stacked Bar Chart'),
                  (e.enablemousetracking = !0),
                  (e.maxbarheight = 50),
                  (e.isstacked = !0),
                  (e.showSum = 0);
              }),
              (a.getDSdef = function() {
                return l['default'];
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      630: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(631)),
          i = o(a(582)),
          l = o(a(538)),
          s = o(a(632)),
          c = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultSeriesType = 'bar3d'),
                (e.defaultPlotShadow = 1),
                (e.isBar = !0),
                (e.defaultZeroPlaneHighlighted = !1),
                e.registerFactory('dataset', s['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSBar3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSBar3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = 'Multi-series 3D Bar Chart'),
                  (e.hasLegend = !0),
                  (e.defaultDatasetType = 'bar3d'),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return l['default'];
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      631: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(518)),
          i = o(a(497)),
          l = o(a(632)),
          s = (function(t) {
            function e() {
              var e;
              return (
                (e = t.call(this) || this).registerFactory(
                  'canvas',
                  i['default'],
                ),
                e.registerFactory('dataset', l['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSBarCartesian3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSBarCartesian3D';
              }),
              (a.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e),
                  (this.config.drawTrendRegion = 0);
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.showplotborder = 0),
                  (e.showzeroplaneontop = 0);
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      632: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              o,
              i,
              l,
              s = t.getFromEnv('dataSource').dataset,
              c = t.getChildren().canvas[0],
              u = (e = c.getChildren('vCanvas')[0]),
              d = t.config.defaultDatasetType || '';
            s || t.setChartMessage();
            (0, n.componentFactory)(e, r['default'], 'datasetGroup_' + d),
              (l = e.getChildren('datasetGroup_' + d)[0]),
              (a = t.getDSGroupdef()),
              (0, n.componentFactory)(l, a, 'datasetGroup_' + d, 1, [{}]),
              (i = l.getChildren('datasetGroup_' + d)) && (u = i[0]),
              (o = t.getDSdef()),
              (0, n.datasetFactory)(u, o, 'dataset', s.length, s);
          });
        var n = a(193),
          r = o(a(502));
      },
      633: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(634))['default'];
        e['default'] = n;
      },
      634: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(635)),
          i = o(a(591)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedBar2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedBar2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Stacked Bar Chart'),
                  (e.enablemousetracking = !0),
                  (e.maxbarheight = 50),
                  (e.isstacked = !0),
                  (e.showSum = 0);
              }),
              (a.getDSGroupdef = function() {
                return i['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      635: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(518)),
          i = o(a(533)),
          l = o(a(582)),
          s = o(a(521)),
          c = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).isBar = !0),
                e.registerFactory('dataset', s['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSBar2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSBar2D';
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Multi-series Bar Chart'),
                  (e.hasLegend = !0),
                  (e.defaultDatasetType = 'bar2d');
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      636: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(637))['default'];
        e['default'] = n;
      },
      637: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(638)),
          i = o(a(504)),
          l = o(a(591)),
          s = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = '3D Stacked Column Chart'),
                  (e.showSum = 0),
                  (e.maxbarheight = 50),
                  (e.enablemousetracking = !0),
                  (e.isstacked = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      638: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(639)),
          i = o(a(504)),
          l = o(a(582)),
          s = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.defaultZeroPlaneHighlighted = !1),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSColumn3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSColumn3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = 'Multi-series 3D Column Chart'),
                  (e.defaultDatasetType = 'column3d'),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      639: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(519)),
          i = o(a(497)),
          l = o(a(632)),
          s = (function(t) {
            function e() {
              var e;
              return (
                (e = t.call(this) || this).registerFactory(
                  'canvas',
                  i['default'],
                ),
                e.registerFactory('dataset', l['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSCartesian3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSCartesian3D';
              }),
              (a.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e),
                  (this.config.drawTrendRegion = 0);
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.showplotborder = 0),
                  (e.drawcrosslineontop = 0),
                  (e.showzeroplaneontop = 0);
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      640: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(641))['default'];
        e['default'] = n;
      },
      641: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(588)),
          i = o(a(492)),
          l = o(a(591)),
          s = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Stacked Column Chart'),
                  (e.isstacked = !0),
                  (e.showSum = 0);
              }),
              (a.getDSdef = function() {
                return i['default'];
              }),
              (a.getDSGroupdef = function() {
                return l['default'];
              }),
              e
            );
          })(r['default']);
        e['default'] = s;
      },
      642: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(599))['default'];
        e['default'] = n;
      },
      643: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(644))['default'];
        e['default'] = n;
      },
      644: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(645)),
          i = o(a(591)),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn3DLineDy';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn3DLineDy';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.sDefaultDatasetType = 'line'),
                  (e.friendlyName = 'Stacked 3D Column and Line Chart'),
                  (e.defaultDatasetType = 'column3d'),
                  (e.use3dlineshift = 1),
                  (e.isdual = !0),
                  (e.isstacked = !0),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0),
                  (e.showSum = 0);
              }),
              (a.getDSGroupdef = function(t) {
                return 'column3d' === t ? i['default'] : void 0;
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      645: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(646)),
          i = o(a(504)),
          l = o(a(509)),
          s = o(a(582)),
          c = o(a(647)),
          u = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                (e.isDual = !0),
                e.registerFactory('dataset', c['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSColumn3DLineDy';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSColumn3DLineDy';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.sDefaultDatasetType = 'line'),
                  (e.friendlyName = 'Multi-series 3D Column and Line Chart'),
                  (e.defaultDatasetType = 'column3d'),
                  (e.use3dlineshift = 1),
                  (e.isdual = !0),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = '100'),
                  (e.anchorimagealpha = '100'),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = '70'),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = '100'),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0);
              }),
              (a.getDSdef = function(t) {
                return 'line' === t ? l['default'] : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column3d' === t ? s['default'] : void 0;
              }),
              (a.getDSType = function(t, e) {
                return (t && 'line' === t.toLowerCase()) || e
                  ? 'line'
                  : 'column3d';
              }),
              e
            );
          })(r['default']);
        e['default'] = u;
      },
      646: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(561)),
          i = o(a(497)),
          l = (function(t) {
            function e() {
              var e;
              return (
                (e = t.call(this) || this).registerFactory(
                  'canvas',
                  i['default'],
                ),
                e
              );
            }
            (0, n['default'])(e, t);
            var a = e.prototype;
            return (
              (a.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e),
                  (this.config.drawTrendRegion = 0);
              }),
              (e.getName = function() {
                return 'MSDybaseCartesian3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this),
                  (this.config.is3D = !0),
                  (this.config.showzeroplaneontop = 0);
              }),
              (a.getName = function() {
                return 'MSDybaseCartesian3D';
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      647: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0),
          (e['default'] = function(t) {
            var e,
              a,
              o,
              l,
              s,
              c,
              u,
              d,
              f,
              h,
              p = t.getFromEnv('dataSource').dataset,
              g = t.getChildren().canvas[0].getChildren('vCanvas'),
              v = g[0],
              m = g[1],
              b = t.getFromEnv('chartConfig').isdual,
              C = {vCanvasDatasetsDef0: {}, vCanvasDatasetsDef1: {}},
              D = {vCanvas0: {}, vCanvas1: {}};
            p || t.setChartMessage();
            for (a = 0; a < p.length; a++)
              (e = p[a]),
                's' === (d = e.parentyaxis || '').toLowerCase() && b
                  ? ((u = (0, r.pluck)(
                      e.renderas,
                      t.config.sDefaultDatasetType,
                    )),
                    (f = m),
                    (h = D.vCanvas1),
                    (l = C.vCanvasDatasetsDef1))
                  : ((u = (0, r.pluck)(
                      e.renderas,
                      t.config.defaultDatasetType,
                    )),
                    (f = v),
                    (h = D.vCanvas0),
                    (l = C.vCanvasDatasetsDef0)),
                (u = t.getDSType(u, 's' === d.toLowerCase())),
                (c = t.getDSGroupdef(u, d)) &&
                  ((0, r.componentFactory)(
                    f,
                    n['default'],
                    'multiseriesColumnManager3D',
                  ),
                  (o = f.getChildren('multiseriesColumnManager3D')[0]),
                  (h[o.getName()] = !0),
                  (0, r.componentFactory)(o, c, 'multiseriesColumnManager'),
                  (h[c.getName().toLowerCase()] = !0)),
                (h[u.toLowerCase()] = !0),
                l[u]
                  ? (l[u].conf.push(e), l[u].indices.push(a))
                  : ((l[u] = {}),
                    (l[u].indices = [a]),
                    (l[u].classDef = t.getDSdef(u)),
                    (l[u].conf = [e]),
                    (l[u].pYAxis = d.toLowerCase()),
                    (l[u].parent = c
                      ? o.getChildren('multiseriesColumnManager')[0]
                      : f));
            for (var _ in C)
              if (C.hasOwnProperty(_))
                for (u in (l = C[_]))
                  l.hasOwnProperty(u) &&
                    ('group' === (s = l[u]).parent.getType() &&
                      s.parent.configure(s.conf),
                    (0, r.datasetFactory)(
                      s.parent,
                      s.classDef,
                      'dataset_' + u,
                      s.conf.length,
                      s.conf,
                      s.indices,
                    ));
            (0, i.removeComponents)(g[0], Object.keys(D.vCanvas0)),
              (0, i.removeComponents)(g[1], Object.keys(D.vCanvas1));
          });
        var n = o(a(502)),
          r = a(193),
          i = a(564);
      },
      648: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(645))['default'];
        e['default'] = n;
      },
      649: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(575))['default'];
        e['default'] = n;
      },
      650: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(651))['default'];
        e['default'] = n;
      },
      651: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(646)),
          i = o(a(504)),
          l = o(a(510)),
          s = o(a(509)),
          c = o(a(576)),
          u = o(a(580)),
          d = o(a(582)),
          f = a(193),
          h = o(a(647)),
          p = f.preDefStr.HUNDREDSTRING,
          g = f.preDefStr.SEVENTYSTRING,
          v = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).isDual = !0),
                e.registerFactory('dataset', h['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSCombiDY3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSCombiDY3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.sDefaultDatasetType = 'line'),
                  (e.defaultDatasetType = 'column3d'),
                  (e.showplotborder = 0),
                  (e.isdual = 1),
                  (e.enablemousetracking = !0),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = p),
                  (e.anchorimagealpha = p),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = g),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = p),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0);
              }),
              (a.getDSGroupdef = function(t) {
                return 'column3d' === t.toLowerCase() ? d['default'] : void 0;
              }),
              (a.getDSdef = function(t) {
                return 'splinearea' === t.toLowerCase()
                  ? c['default']
                  : 'spline' === t.toLowerCase()
                  ? u['default']
                  : 'area' === t.toLowerCase()
                  ? l['default']
                  : 'line' === t.toLowerCase()
                  ? s['default']
                  : i['default'];
              }),
              (a.getDSType = function(t) {
                return 'splinearea' === t.toLowerCase()
                  ? 'splinearea'
                  : 'spline' === t.toLowerCase()
                  ? 'spline'
                  : 'area' === t.toLowerCase()
                  ? 'area'
                  : 'line' === t.toLowerCase()
                  ? 'line'
                  : 'column3d';
              }),
              e
            );
          })(r['default']);
        e['default'] = v;
      },
      652: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(653))['default'];
        e['default'] = n;
      },
      653: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(654)),
          i = o(a(504)),
          l = o(a(509)),
          s = o(a(591)),
          c = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn3DLine';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn3DLine';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = 'Stacked 3D Column and Line Chart'),
                  (e.use3dlineshift = 1),
                  (e.isstacked = !0),
                  (e.stack100percent = 0),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0),
                  (e.showSum = 0);
              }),
              (a.getDSdef = function(t) {
                return 'line' === t ? l['default'] : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? s['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return t && 'line' === t.toLowerCase() ? 'line' : 'column';
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      654: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(639)),
          i = o(a(504)),
          l = o(a(576)),
          s = o(a(580)),
          c = o(a(510)),
          u = o(a(509)),
          d = o(a(582)),
          f = o(a(647)),
          h = (function(t) {
            function e() {
              var e;
              return (
                ((e = t.call(this) || this).defaultPlotShadow = 1),
                e.registerFactory('dataset', f['default'], ['vCanvas']),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSCombi3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSCombi3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = 'Multi-series 3D Combination Chart'),
                  (e.defaultDatasetType = 'column3d'),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = void 0),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = void 0),
                  (e.anchorbgalpha = '100'),
                  (e.anchorimagealpha = '100'),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = void 0),
                  (e.anchorbordercolor = void 0),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = '70'),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = void 0),
                  (e.linealpha = '100'),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0);
              }),
              (a.getDSdef = function(t) {
                return 'splinearea' === t
                  ? l['default']
                  : 'spline' === t
                  ? s['default']
                  : 'area' === t
                  ? c['default']
                  : 'line' === t
                  ? u['default']
                  : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column3d' === t ? d['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'area' === t.toLowerCase()
                    ? 'area'
                    : 'line' === t.toLowerCase()
                    ? 'line'
                    : 'spline' === t.toLowerCase()
                    ? 'spline'
                    : 'splinearea' === t.toLowerCase()
                    ? 'splinearea'
                    : 'column3d'
                );
              }),
              e
            );
          })(r['default']);
        e['default'] = h;
      },
      655: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(656))['default'];
        e['default'] = n;
      },
      656: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(657)),
          i = o(a(492)),
          l = o(a(509)),
          s = o(a(580)),
          c = o(a(591)),
          u = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn2DLine';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn2DLine';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Stacked Column and Line Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.isstacked = !0),
                  (e.stack100percent = 0),
                  (e.enablemousetracking = !0),
                  (e.showSum = 0);
              }),
              (a.getDSdef = function(t) {
                return 'spline' === t
                  ? s['default']
                  : 'line' === t
                  ? l['default']
                  : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? c['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'line' === t.toLowerCase() ? 'line' : 'column'
                );
              }),
              e
            );
          })(r['default']);
        e['default'] = u;
      },
      657: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(627)),
          i = o(a(492)),
          l = o(a(510)),
          s = o(a(509)),
          c = o(a(576)),
          u = o(a(580)),
          d = o(a(582)),
          f = o(a(563)),
          h = (function(t) {
            function e() {
              var e;
              return (
                (e = t.call(this) || this).registerFactory(
                  'dataset',
                  f['default'],
                  ['vCanvas'],
                ),
                e
              );
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSCombi2D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSCombi2D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Multi-series Combination Chart'),
                  (e.defaultDatasetType = 'column'),
                  (e.enablemousetracking = !0),
                  (e.showzeroplaneontop = 0);
              }),
              (a.getDSdef = function(t) {
                return 'splinearea' === t
                  ? c['default']
                  : 'spline' === t
                  ? u['default']
                  : 'area' === t
                  ? l['default']
                  : 'line' === t
                  ? s['default']
                  : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? d['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'splinearea' === t.toLowerCase()
                    ? 'splinearea'
                    : 'spline' === t.toLowerCase()
                    ? 'spline'
                    : 'area' === t.toLowerCase()
                    ? 'area'
                    : 'line' === t.toLowerCase()
                    ? 'line'
                    : 'column'
                );
              }),
              e
            );
          })(r['default']);
        e['default'] = h;
      },
      658: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(659))['default'];
        e['default'] = n;
      },
      659: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(654)),
          i = o(a(504)),
          l = o(a(509)),
          s = o(a(582)),
          c = (function(t) {
            function e() {
              var e;
              return ((e = t.call(this) || this).defaultPlotShadow = 1), e;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'MSColumnLine3D';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'MSColumnLine3D';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.is3D = !0),
                  (e.friendlyName = 'Multi-series Column and Line Chart'),
                  (e.use3dlineshift = 1),
                  (e.showplotborder = 0),
                  (e.enablemousetracking = !0);
              }),
              (a.getDSdef = function(t) {
                return 'line' === t ? l['default'] : i['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column3d' === t ? s['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return t && 'line' === t.toLowerCase() ? 'line' : 'column3d';
              }),
              e
            );
          })(r['default']);
        e['default'] = c;
      },
      660: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(654))['default'];
        e['default'] = n;
      },
      661: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(657))['default'];
        e['default'] = n;
      },
      662: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(663))['default'];
        e['default'] = n;
      },
      663: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(519)),
          i = o(a(664)),
          l = o(a(666)),
          s = o(a(521)),
          c = a(193),
          u = (function(t) {
            (0, n['default'])(a, t),
              (a.getName = function() {
                return 'Marimekko';
              });
            var e = a.prototype;
            function a() {
              var e;
              return (
                ((e = t.call(this) || this).isValueAbs = !0),
                (e.distributedColumns = !0),
                (e.stack100percent = !0),
                (e.isStacked = !0),
                e.registerFactory(
                  'dataset',
                  function(t) {
                    (0, s['default'])(t);
                    var e = t.getChildren().canvas[0].getChildren('vCanvas')[0],
                      a = t.config.defaultDatasetType || '';
                    e.getChildren('datasetGroup_' + a)[0].addToEnv(
                      'categories',
                      t.getFromEnv('dataSource').categories,
                    );
                  },
                  ['vCanvas'],
                ),
                e
              );
            }
            return (
              (e._checkInvalidSpecificData = function() {
                var t = this.getFromEnv('dataSource'),
                  e = t.dataset,
                  a = t.categories;
                if (
                  !(
                    e &&
                    a &&
                    0 !== a.length &&
                    a[0].category &&
                    a[0].category instanceof Array
                  )
                )
                  return !0;
              }),
              (e.getName = function() {
                return 'Marimekko';
              }),
              (e.parseChartAttr = function(e) {
                t.prototype.parseChartAttr.call(this, e),
                  (this.config.showXAxisPercentValues = (0, c.pluckNumber)(
                    e.chart && e.chart.showxaxispercentvalues,
                    1,
                  ));
              }),
              (e.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Marimekko Chart'),
                  (e.defaultDatasetType = 'marimekko'),
                  (e.isstacked = !0),
                  (e.showpercentvalues = 0),
                  (e.usepercentdistribution = 1),
                  (e.showSum = 1),
                  (e.enablemousetracking = !0);
              }),
              (e.getDSdef = function() {
                return i['default'];
              }),
              (e.getDSGroupdef = function() {
                return l['default'];
              }),
              a
            );
          })(r['default']);
        e['default'] = u;
      },
      664: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(492)),
          i = a(193),
          l = o(a(665)),
          s = a(201),
          c = i.regex.dropHypeash,
          u = Math,
          d = u.round,
          f = u.abs;
        (0, s.addDep)({
          name: 'marimekkoAnimation',
          type: 'animationRule',
          extension: l['default'],
        });
        var h = (function(t) {
          function e() {
            var e;
            return ((e = t.call(this) || this).config.groupName = 'column'), e;
          }
          (0, n['default'])(e, t);
          var a = e.prototype;
          return (
            (a.getType = function() {
              return 'dataset';
            }),
            (a.getName = function() {
              return 'marimekko';
            }),
            (a.configure = function(e) {
              (0, i.fcEach)(e.data, function(t) {
                t && (t.value = f(t.value));
              }),
                t.prototype.configure.call(this, e);
            }),
            (a._addLegend = function() {
              var t,
                e,
                a,
                o,
                n = this.config,
                r = this.getFromEnv('legend'),
                l = (0, i.pluckNumber)(
                  this.getFromEnv('chart-attrib').useplotgradientcolor,
                  1,
                ),
                s = n.legendSymbolColor;
              (t = (0, i.getLightColor)(s, 60).replace(c, i.HASHSTRING)),
                (e = l
                  ? {
                      FCcolor: {
                        color:
                          s +
                          ',' +
                          s +
                          ',' +
                          (0, i.getLightColor)(s, 40) +
                          ',' +
                          s +
                          ',' +
                          s,
                        ratio: '0,70,30',
                        angle: 270,
                        alpha: '100,100,100,100,100',
                      },
                    }
                  : {FCcolor: {color: s, angle: 0, ratio: '0', alpha: '100'}}),
                (a = {
                  enabled: n.includeInLegend,
                  type: this.type,
                  label: (0, i.getFirstValue)(this.config.JSONData.seriesname),
                }),
                n.includeinlegend
                  ? ((o = r.getItem(this.config.legendItemId)) ||
                      ((this.config.legendItemId = r.createItem(this)),
                      (o = r.getItem(this.config.legendItemId)),
                      this.addExtEventListener(
                        'fc-click',
                        function() {
                          o.itemClickFn();
                        },
                        o,
                      )),
                    o.configure(a),
                    o.setStateCosmetics('default', {
                      symbol: {
                        fill: (0, i.toRaphaelColor)(e),
                        rawFillColor: e.FCcolor.color,
                        stroke: (0, i.toRaphaelColor)(t),
                      },
                    }),
                    this.getState('visible')
                      ? o.removeLegendState('hidden')
                      : o.setLegendState('hidden'))
                  : this.config.legendItemId &&
                    r.disposeItem(this.config.legendItemId);
            }),
            (a.searchIndex = function(t, e) {
              for (
                var a, o, n = this.getFromEnv('xAxis'), r = 0, i = e.length - 1;
                r <= i;

              )
                if (
                  ((a = Math.round((r + i) / 2) || 0),
                  (o = n.getPixel(e[a].x) + e[a].columnWidth / 2) < t)
                )
                  r = a + 1;
                else {
                  if (!(o > t)) return a;
                  i = a - 1;
                }
              return r;
            }),
            (a.allocatePosition = function() {
              this.getLinkedParent()._setStackDimensions(),
                t.prototype.allocatePosition.call(this);
            }),
            (a._getHoveredPlot = function(t, e) {
              var a,
                o,
                n,
                r,
                i = this.getLinkedParent(),
                l = i.getstackConf(),
                s = this.getFromEnv('chartConfig'),
                c = i.config,
                u = s.plotborderthickness,
                d = s.showplotborder,
                f = l.length - 1;
              return (
                (o =
                  t +
                  (a =
                    (a = (u = d ? u : 0) / 2) % 2 == 0
                      ? a + 1
                      : Math.round(a))),
                (r = (n && c.datasetIndex) || this.searchIndex(o, l)),
                c.datasetIndex || (c.datasetIndex = r),
                (n = this._checkPointerOverColumn(r, t, e))
                  ? delete c.datasetIndex
                  : this.index === f && delete c.datasetIndex,
                n
              );
            }),
            (a.setColumnPosition = function() {
              return this;
            }),
            (a.fineTunePlotDimension = function(t, e, a, o, n) {
              var r = a,
                i = o,
                l = t,
                s = e,
                c = this.getLinkedParent().getstackConf(),
                u = this.getFromEnv('chart'),
                f = u.config.plotborderthickness,
                h = u.getChildren('canvas')[0].config,
                p = h.canvasBorderWidth > 0,
                g = h.canvasRight,
                v = h.canvasTop,
                m = h.canvasLeft;
              return c.length
                ? ((l -= (i = c[n].columnWidth) / 2),
                  parseInt(s, 10) <= v && ((r -= v - s - +p), (s = v - +p)),
                  f <= 1 &&
                    (d(l) <= m && ((i += l), (i -= l = m - f / 2 + +!!f - +p)),
                    d(l + i) >= g && (i = g - l + f / 2 - +!!f + +p)),
                  {xPos: l, yPos: s, width: i, height: r})
                : {xPos: l, yPos: s, width: i, height: r};
            }),
            e
          );
        })(r['default']);
        e['default'] = h;
      },
      665: function(t, e, a) {
        'use strict';
        (e.__esModule = !0), (e['default'] = void 0);
        var o = a(193),
          n = {
            'initial.dataset.marimekko': function() {
              var t = this,
                e = t.getFromEnv('chart'),
                a = e.config.yDepth || 0,
                n = t.getFromEnv('yAxis');
              return {
                'rect.appearing': function(r) {
                  var i,
                    l,
                    s,
                    c,
                    u = n.getPixel(n.getAxisBase()) + (e.isBar ? -a : a),
                    d = r.attr;
                  return (
                    (i = d.y),
                    (l = d.height),
                    (c = Math.sign(i + l / 2 - u)),
                    (s = i + l),
                    [
                      {
                        initialAttr: function() {
                          var t = {};
                          return (t.y = s), (t.height = 0), t;
                        },
                        slot: 'plot',
                        startEnd: function() {
                          return o.animHelperFN.getTimeByValue(
                            {start: 0, end: 0.6},
                            {
                              startPx: u,
                              endPx:
                                1 === c
                                  ? t.config.yAxisMaxPixel
                                  : t.config.yAxisMinPixel,
                            },
                            {startPx: s, endPx: 1 === c ? d.y + d.height : d.y},
                          );
                        },
                        effect: 'linear',
                      },
                    ]
                  );
                },
                'group.appearing': null,
                'group.updating': null,
                'plotLabel.appearing': [
                  {initialAttr: {opacity: 0}, slot: 'final'},
                ],
                '*': null,
              };
            },
          };
        e['default'] = n;
      },
      666: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(591)),
          i = a(193),
          l = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t);
            var a = e.prototype;
            return (
              (a.getType = function() {
                return 'group';
              }),
              (a.getName = function() {
                return 'marimekkoStackgroup';
              }),
              (a.getstackConf = function() {
                return this.config.stackConf;
              }),
              (a._setStackPosition = function() {
                t.prototype._setStackPosition.call(this);
                var e,
                  a,
                  o,
                  n,
                  r,
                  i,
                  l = this.config,
                  s = l.stackConf || (l.stackConf = []),
                  c = l.stackValues,
                  u = this.getFromEnv('categories')[0].category,
                  d = this.getFromEnv('number-formatter'),
                  f = 0,
                  h = 0,
                  p = 0,
                  g = this.getFromEnv('xAxis'),
                  v = g.getVisibleConfig(),
                  m = v.minValue,
                  b = v.maxValue - m,
                  C = m;
                for (n = 0, r = c.length; n < r; n++)
                  h += (c[n] && c[n].positive) || 0;
                for (l.totalSumValue = h, n = 0; n < u.length; n++)
                  (a = u[n]).widthpercent &&
                    (f += d.getCleanValue(a.widthpercent));
                for (
                  100 == +f.toFixed(8) &&
                    ((f = +f.toFixed(8)), (l.setUserWidth = 1)),
                    e = this.getStackSumPercent(),
                    n = 0,
                    r = c.length;
                  n < r;
                  n++
                )
                  (o = s[n]) || (o = s[n] = {}),
                    (p += e[n] / 100),
                    (i = ((e[n] / 100) * b) / 2 + C),
                    (C = p * b + m),
                    (o.x = i),
                    g.updateTicksValues(n, {x: i});
              }),
              (a.getStackSumPercent = function() {
                var t,
                  e = this.config,
                  a = e.stackValues,
                  o = e.totalSumValue,
                  n = this.getFromEnv('number-formatter'),
                  r = this.getFromEnv('categories')[0].category,
                  i = e.setUserWidth,
                  l = [];
                for (t = 0; t < a.length; t++)
                  l[t] = i
                    ? n.getCleanValue(r[t].widthpercent)
                    : (((a[t] && a[t].positive) || 0) / o) * 100;
                return l;
              }),
              (a.draw = function() {
                t.prototype.draw.call(this), this.drawLabel();
              }),
              (a.createContainer = function() {
                t.prototype.createContainer.call(this);
                var e = this.getLinkedParent();
                !this.getContainer('commonLabelContainer') &&
                  this.addContainer(
                    'commonLabelContainer',
                    (function(t, e, a) {
                      return a
                        .getFromEnv('animationManager')
                        .setAnimation({
                          el: 'group',
                          attr: {name: t},
                          container: e,
                          component: a,
                          label: 'group',
                        });
                    })(
                      'manager-commonLabelContainer',
                      e.getChildContainer('vcanvasLabelGroup'),
                      this,
                    ),
                  );
              }),
              (a.drawLabel = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r,
                  l,
                  s,
                  c,
                  u,
                  d,
                  f,
                  h,
                  p,
                  g,
                  v = this.config,
                  m = this.getFromEnv('smartLabel'),
                  b = this.getFromEnv('animationManager'),
                  C = this.getStackSumPercent(),
                  D = this.getFromEnv('chart-attrib'),
                  _ = this.getChildren('dataset'),
                  y = v.stackConf,
                  S = this.getContainer('commonLabelContainer'),
                  k = this.getFromEnv('number-formatter'),
                  x = 0,
                  A = this.getFromEnv('chartConfig'),
                  P = A.canvasBottom,
                  w = this.getFromEnv('xAxis'),
                  N = this.getFromEnv('style'),
                  F = A.dataLabelStyle,
                  M = C.length,
                  T = v.stackValues,
                  B = A.showXAxisPercentValues,
                  L = this.getGraphicalElement('commonLabels') || [],
                  I = L.length;
                if ((m.setStyle(F), B)) {
                  for (
                    f = (0, i.pluck)(F.backgroundColor, '#ffffff'),
                      d = (0, i.pluck)(
                        F.borderColor === i.BLANKSTRING
                          ? '#' + N.inCancolor
                          : F.borderColor,
                        '#000000',
                      ),
                      h = (0, i.pluck)(F.borderThickness, 1),
                      r = 0;
                    r < M - 1;
                    r++
                  )
                    T[r] &&
                      ((x += C[r]),
                      (l = k.percentValue(x)),
                      (o = w.getPixel(y[r].x) + y[r].columnWidth / 2),
                      (n = P),
                      (u = L[r]),
                      T[r].positive !== T[r].negative
                        ? ((s = {
                            text: l,
                            fill: F.color,
                            'text-bound': [
                              f,
                              d,
                              h,
                              F.borderPadding,
                              F.borderRadius,
                              F.borderDash,
                            ],
                            'line-height': F.lineHeight,
                            visibility: i.visibleStr,
                          }),
                          (n = n - m.getOriSize(l).height / 2 - h),
                          (s.x = o),
                          (s.y = n),
                          u && u.show(),
                          (c = b.setAnimation({
                            el: u || 'text',
                            container: S,
                            attr: s,
                            label: 'text',
                            component: this,
                          })),
                          u || this.addGraphicalElement('commonLabels', c, !0))
                        : ((l = i.BLANKSTRING), u && u.hide()));
                  for (var E = r; E < I; E++) L[E].hide();
                }
                for (p = 0; p < _.length; p++)
                  for (
                    a = (e = _[p]).components.data,
                      t = e.config.JSONData,
                      g = 0;
                    g < a.length;
                    g++
                  )
                    a[g].config.finalTooltext = (0, i.parseTooltext)(
                      a[g].config.finalTooltext,
                      [111],
                      {xAxisPercentValue: C[g] && C[g].toPrecision(4) + '%'},
                      a,
                      D,
                      t,
                    );
              }),
              (a._getXpos = function(t) {
                return this.getFromEnv('xAxis').getPixel(
                  this.config.stackConf[t].x,
                );
              }),
              (a._setStackDimensions = function() {
                var t,
                  e,
                  a,
                  o,
                  n,
                  r,
                  i = this.config,
                  l = i.stackValues,
                  s = this.getFromEnv('categories')[0].category,
                  c = 0,
                  u = this.getFromEnv('number-formatter'),
                  d = this.getStackSumPercent(),
                  f = this.getFromEnv('canvasConfig').canvasWidth,
                  h = i.stackConf || (i.stackConf = []);
                for (t = 0; t < s.length; t++)
                  (e = s[t]).widthpercent &&
                    (c += u.getCleanValue(e.widthpercent));
                for (
                  100 == +c.toFixed(8) &&
                    ((a = i.setUserWidth = 1), (c = +c.toFixed(8))),
                    t = 0,
                    o = l.length;
                  t < o;
                  t++
                )
                  (e = s[t]),
                    (n = h[t]) || (n = h[t] = {}),
                    (r = a
                      ? u.getCleanValue(e.widthpercent) / 100
                      : d[t] / 100),
                    (n.columnWidth = r * f);
              }),
              e
            );
          })(r['default']);
        e['default'] = l;
      },
      667: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(626))['default'];
        e['default'] = n;
      },
      668: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(630))['default'];
        e['default'] = n;
      },
      669: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(635))['default'];
        e['default'] = n;
      },
      670: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(671))['default'];
        e['default'] = n;
      },
      672: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(638))['default'];
        e['default'] = n;
      },
      673: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(588))['default'];
        e['default'] = n;
      },
      686: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(687))['default'];
        e['default'] = n;
      },
      687: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = a(193),
          i = o(a(591)),
          l = o(a(509)),
          s = o(a(492)),
          c = o(a(561)),
          u = 'Stacked 2D Column and Line Chart',
          d = r.preDefStr.SEVENTYSTRING,
          f = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedColumn2DLineDy';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedColumn2DLineDy';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = u),
                  (e.sDefaultDatasetType = 'line'),
                  (e.friendlyName = u),
                  (e.defaultDatasetType = 'column'),
                  (e.isdual = !0),
                  (e.isstacked = !0),
                  (e.enablemousetracking = !0),
                  (e.stack100percent = 0),
                  (e.showSum = 0),
                  (e.anchorborderthickness = 1),
                  (e.anchorimageurl = r.UNDEF),
                  (e.anchorimagepadding = 1),
                  (e.anchorsides = 1),
                  (e.anchoralpha = r.UNDEF),
                  (e.anchorbgalpha = r.HUNDREDSTRING),
                  (e.anchorimagealpha = r.HUNDREDSTRING),
                  (e.anchorimagescale = 100),
                  (e.anchorstartangle = 90),
                  (e.anchorshadow = 0),
                  (e.anchorbgcolor = r.UNDEF),
                  (e.anchorbordercolor = r.UNDEF),
                  (e.anchorradius = 3),
                  (e.showvalues = 1),
                  (e.plotfillalpha = d),
                  (e.linedashlen = 5),
                  (e.linedashgap = 4),
                  (e.linedashed = r.UNDEF),
                  (e.linealpha = r.HUNDREDSTRING),
                  (e.linethickness = 2),
                  (e.drawfullareaborder = 1),
                  (e.connectnulldata = 0),
                  (e.showzeroplaneontop = 0);
              }),
              (a.getDSdef = function(t) {
                return 'line' === t ? l['default'] : s['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'column' === t ? i['default'] : r.UNDEF;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'line' === t.toLowerCase() ? 'line' : 'column'
                );
              }),
              e
            );
          })(c['default']);
        e['default'] = f;
      },
      688: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(689))['default'];
        e['default'] = n;
      },
      689: function(t, e, a) {
        'use strict';
        var o = a(187);
        (e.__esModule = !0), (e['default'] = void 0);
        var n = o(a(207)),
          r = o(a(591)),
          i = o(a(509)),
          l = o(a(510)),
          s = o(a(687)),
          c = a(193),
          u = (function(t) {
            function e() {
              return t.apply(this, arguments) || this;
            }
            (0, n['default'])(e, t),
              (e.getName = function() {
                return 'StackedArea2DLineDy';
              });
            var a = e.prototype;
            return (
              (a.getName = function() {
                return 'StackedArea2DLineDy';
              }),
              (a.__setDefaultConfig = function() {
                t.prototype.__setDefaultConfig.call(this);
                var e = this.config;
                (e.friendlyName = 'Stacked 2D Area and Line Chart'),
                  (e.plotfillalpha = c.HUNDREDSTRING),
                  (e.isstacked = 1),
                  (e.defaultDatasetType = 'area'),
                  (e.stack100percent = 0),
                  (e.defaultcrosslinethickness = 1),
                  this.addToEnv('useImprovedLabelPlacement', !0),
                  this.addToEnv('useLinePlotGroupForAnchorPlacement', !0);
              }),
              (a.getDSdef = function(t) {
                return 'line' === t ? i['default'] : l['default'];
              }),
              (a.getDSGroupdef = function(t) {
                return 'area' === t ? r['default'] : void 0;
              }),
              (a.getDSType = function(t) {
                return (
                  void 0 === t && (t = ''),
                  'line' === t.toLowerCase() ? 'line' : 'area'
                );
              }),
              e
            );
          })(s['default']);
        e['default'] = u;
      },
    },
  ]);
});
//# sourceMappingURL=http://localhost:3052/3.15.1-sr.1/map/eval/fusioncharts.charts.js.map
