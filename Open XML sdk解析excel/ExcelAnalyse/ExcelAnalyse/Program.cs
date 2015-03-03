using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Packaging;
using System.IO;
using System.Xml;
using Oracle.DataAccess.Client;
using System.Drawing;


namespace ExeclAnalyse
{
    class Program
    {
        public static int lol = 1;

        static int k = 1;

        static Boolean he=true ;

        public static int pre = 1;

        public static int tempTestid = 181;

        public static string picturepath = "W:\\Users\\Long\\Desktop\\";

        public static int userid = 0;

        public static Boolean success;

        public static List<OpenXmlElement> shareString;

        public static List<OpenXmlElement> cellXfs;

        public static List<OpenXmlElement> fonts;

        public static List<OpenXmlElement> fills;

        public static OpenXmlElement[] gg;

        public static Dictionary<string, string> chineseattr;

        static void Createroot(string value1,string value2,string value3,string value4,string value5,XmlDocument xmlDoc, XmlElement root)
        {
           
             XmlElement record = xmlDoc.CreateElement("record");
             root.AppendChild(record);
             XmlAttribute countAttr=null;
             countAttr = xmlDoc.CreateAttribute("ID");
             countAttr.Value = value1;
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("fid");
             countAttr.Value = value2;
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("node");
             countAttr.Value = value3;
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("content");
             countAttr.Value = "";
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("prefix");
             countAttr.Value = value4;
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("leaf");
             countAttr.Value = value5;
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("paper");
             countAttr.Value = tempTestid.ToString();
             record.Attributes.Append(countAttr);
             countAttr = xmlDoc.CreateAttribute("userid");
             countAttr.Value = "0";
             record.Attributes.Append(countAttr);

        }

        static void Createrootpicture(string value1, string value2, string value3, string value4, string value5,string picturename, XmlDocument xmlDoc, XmlElement root)
        {

            XmlElement record = xmlDoc.CreateElement("record");
            root.AppendChild(record);
            XmlAttribute countAttr = null;
            countAttr = xmlDoc.CreateAttribute("ID");
            countAttr.Value = value1;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("fid");
            countAttr.Value = value2;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("node");
            countAttr.Value = value3;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("content");
            countAttr.Value = picturename;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("prefix");
            countAttr.Value = value4;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("leaf");
            countAttr.Value = value5;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("paper");
            countAttr.Value = tempTestid.ToString();
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc.CreateAttribute("userid");
            countAttr.Value = "0";
            record.Attributes.Append(countAttr);

        }

        static void Createrootattr(string value1, string value2, string value3, string value4, XmlDocument xmlDoc1, XmlElement root1)
        {

            XmlElement record = xmlDoc1.CreateElement("record");
            root1.AppendChild(record);
            XmlAttribute countAttr = null;
            countAttr = xmlDoc1.CreateAttribute("ID");
            countAttr.Value = pre.ToString();
            pre++;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("fid");
            countAttr.Value = value1;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("prefix");
            countAttr.Value = value2;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("attr");
            countAttr.Value = value3;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("value");
            countAttr.Value = value4;
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("score");
            countAttr.Value = "0";
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("status");
            countAttr.Value = "0";
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("paper");
            countAttr.Value = tempTestid.ToString();
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("userid");
            countAttr.Value = "0";
            record.Attributes.Append(countAttr);
            countAttr = xmlDoc1.CreateAttribute("checkType");
            countAttr.Value = "null";
            record.Attributes.Append(countAttr);

        } 

        public static bool IsNumberic(string oText)
        {
            try
            {
                int var1 = int.Parse(oText);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static OracleConnection Connection()
        {
            String connstr = "Data Source = orcl;User Id = root;Password = root"; //数据库连接语句
            OracleConnection conn = new OracleConnection(connstr);
            return conn;
        }

        public static void get_Attributecomment(OpenXmlElement element, OracleConnection conn, string fid, string prefix, XmlDocument xmlDoc1, XmlElement root1)
        {
            //如果此节点有属性，则输出所有属性
            if (element.HasAttributes)
            {
                foreach (OpenXmlAttribute attr in element.GetAttributes())
                {
                    string key = element.GetType().ToString() + " " + attr.LocalName;
                    Console.WriteLine(key);
                    if (chineseattr.ContainsKey(key))
                    {
                        string name1 = chineseattr[key];
                        Createrootattr(fid, prefix, name1, attr.Value, xmlDoc1, root1);
                    }
                    else
                    {
                        string name1 = element.LocalName + " " + attr.LocalName;
                        Createrootattr(fid, prefix, name1, attr.Value, xmlDoc1, root1);
                    }
                }
            }
            //如果有子节点
            if (element.HasChildren)
            {
                foreach (OpenXmlElement e in element.ChildElements)
                {
                    get_Attributecomment(e, conn, fid,prefix,xmlDoc1,root1);
                }
            }
            //如果没有子节点
            else
            {
                if (element.InnerText != "" && element.InnerText != null)
                {
                    string key = element.GetType().ToString() + " " + element.LocalName;
                    Console.WriteLine(key);
                    if (chineseattr.ContainsKey(key))
                    {
                        Createrootattr(fid, prefix, chineseattr[key], element.InnerText, xmlDoc1, root1);
                    }
                    else
                    {
                        Createrootattr(fid, prefix, element.LocalName, element.InnerText, xmlDoc1, root1);
                    }
                }

            }

        }

        public static void get_Attributesheet(OpenXmlElement element, OracleConnection conn, string temp, int fatherid, XmlDocument xmlDoc, XmlElement root, XmlDocument xmlDoc1, XmlElement root1)//sheet.xml和处理shareString.xml
        {
            //如果此节点有属性，则输出所有属性
            if (element.HasAttributes)
            {
                foreach (OpenXmlAttribute attr in element.GetAttributes())
                {
                    string name = element.LocalName + " " + attr.LocalName;
                    if (name == "c r")
                    {
                        temp = temp + attr.Value;
                        Createroot(lol.ToString(), fatherid.ToString(), attr.Value,temp,"true",xmlDoc,root);
                        lol++;
                    }
                    Createrootattr("0",temp,name,attr.Value,xmlDoc1,root1);
      
                    if (name == "c t" && attr.Value == "s")
                    {
                        success = true;
                    }
                    if (name == "c s")
                    {
                        int s = int.Parse(attr.Value);
                        foreach (OpenXmlAttribute haha in cellXfs[s].GetAttributes())
                        {
                            if (haha.LocalName == "fillId")
                            {
                                int id = int.Parse(haha.Value);
                                get_Attributecomment(fills[id], conn,"0", temp,xmlDoc1,root1);
                            }
                            if (haha.LocalName == "fontId")
                            {
                                int id = int.Parse(haha.Value);
                                get_Attributecomment(fonts[id], conn,"0", temp,xmlDoc1,root1);
                            }
                            if (haha.LocalName == "xfId")
                            {
                                int id = int.Parse(haha.Value);
                                get_Attributecomment(gg[id], conn,"0", temp,xmlDoc1,root1);
                            }
                        }
                        get_Attributecomment(cellXfs[s], conn,"0", temp,xmlDoc1,root1);
                    }
                }
            }
            //如果有子节点
            if (element.HasChildren)
            {
                foreach (OpenXmlElement e in element.ChildElements)
                {
                    get_Attributesheet(e, conn, temp, fatherid,xmlDoc,root,xmlDoc1,root1);
                }
            }
            //如果没有子节点
            else
            {
                if (element.InnerText != "" && element.InnerText != null)
                {
                    Createrootattr("0",temp,element.LocalName,element.InnerText,xmlDoc1,root1);
                
                    if (element.LocalName == "v")
                    {
                        if (IsNumberic(element.InnerText))
                        {
                            int v = int.Parse(element.InnerText);
                            if (success)
                            {
                                
                                foreach (OpenXmlElement oppos in shareString[v])
                                {
                                    if (oppos.LocalName == "r")
                                    {
                                        string temp1 = temp + k;
                                        Console.WriteLine(temp1);
                                        get_Attributecomment(oppos, conn, "0", temp1, xmlDoc1, root1);
                                        k++;
                                        he = false;
                                    }
                                }
                                
                                if (he)
                                {
                                    get_Attributecomment(shareString[v], conn, "0", temp, xmlDoc1, root1);
                                }
                                success = false;
                                he = true;
                                k = 1;
                            }
                        }
                    }

                }

            }


        }

        public static List<String> getSheet(string path)//获取工作表
        {
            List<String> sheets = new List<String>();

            using (SpreadsheetDocument xlPackage = SpreadsheetDocument.Open(path, false))
            {

                WorkbookPart workbook = xlPackage.WorkbookPart;

                Stream workbookstr = workbook.GetStream();

                XmlDocument doc = new XmlDocument();

                doc.Load(workbookstr);

                XmlNamespaceManager nsManager = new XmlNamespaceManager(doc.NameTable);

                nsManager.AddNamespace("default", doc.DocumentElement.NamespaceURI);

                XmlNodeList nodelist = doc.SelectNodes("//default:sheets/default:sheet", nsManager);

                foreach (XmlNode node in nodelist)
                {

                    String sheetName = String.Empty;

                    sheetName = node.Attributes["name"].Value;

                    sheets.Add(sheetName);

                }
                return sheets;
            }
        }

        static void Main(string[] args)
        {
            //-----------------tree.xml
            string tree = tempTestid + "-" + userid + "-node.xml";
            //创建XmlDocument对象xmlDoc  
            XmlDocument xmlDoc = new XmlDocument();
            //创建一个XML文档声明，并添加到文档  
            XmlDeclaration declare = xmlDoc.CreateXmlDeclaration("1.0", "utf-8",
            "yes");
            xmlDoc.AppendChild(declare);
            XmlElement root = xmlDoc.CreateElement("root");
            xmlDoc.AppendChild(root);
            //---------------------

            //-----------------attr.xml
            string attrs1 = tempTestid + "-" + userid + "-attr.xml";
            //创建XmlDocument对象xmlDoc  
            XmlDocument xmlattr = new XmlDocument();
            XmlDeclaration declare1 = xmlattr.CreateXmlDeclaration("1.0", "utf-8",
            "yes");
            //创建一个XML文档声明，并添加到文档  
            xmlattr.AppendChild(declare1);
            XmlElement rootattr = xmlattr.CreateElement("root");
            xmlattr.AppendChild(rootattr);

            XmlElement record = xmlattr.CreateElement("totalScore");
            record.InnerText = "0";
            rootattr.AppendChild(record);
            //---------------------
            double totalTime = System.DateTime.Now.TimeOfDay.TotalSeconds;
            string path1 = "W:\\Users\\Long\\Desktop\\tree.xml";
            string path2 = "W:\\Users\\Long\\Desktop\\attr.xml";
            string path = "W:\\Users\\Long\\Desktop\\Tools\\准备数据\\3-18-datas\\Excel\\试题一\\Excel实操题老师答案.xlsx";
            shareString = new List<OpenXmlElement>();
            cellXfs = new List<OpenXmlElement>();
            fonts = new List<OpenXmlElement>();
            fills = new List<OpenXmlElement>();
            using (SpreadsheetDocument document = SpreadsheetDocument.Open(path, false))
            {
                OracleConnection conn = Connection();
                conn.Open();
                OracleCommand com = conn.CreateCommand();
                com.CommandText = "select * from EXCEL_TRANSLATE";
                OracleDataReader odr = com.ExecuteReader();
                chineseattr=new Dictionary<string,string>();

                while (odr.Read())
                {
                    if (!chineseattr.ContainsKey(odr.GetOracleString(5).ToString()))
                    {
                        chineseattr.Add(odr.GetOracleString(5).ToString(), odr.GetOracleString(4).ToString());
                    }
                    //Console.WriteLine(odr.GetString(5));
                   // Console.WriteLine(odr.GetOracleString(4).ToString());
                }
                //Console.WriteLine(chineseattr["DocumentFormat.OpenXml.Spreadsheet.Alignment horizontal"]);
                /*string sql = "select * from EXCEL_TRANSLATE";
                OracleCommand cmd = new OracleCommand(sql, conn);
                OracleDataAdapter oda = new OracleDataAdapter(cmd);
                while (oda.)
                {
                }*/
                
                IEnumerable<OpenXmlElement> kkk1 = document.ExtendedFilePropertiesPart.RootElement;
                Createroot(lol.ToString(), "0", "文档属性", "文档属性", "false", xmlDoc,root);
                lol++;
                int fff = lol - 1;
                foreach (OpenXmlElement oppos in kkk1)
                {
                    string fftemp = "文档属性" + "/" + oppos.LocalName;
                    Createroot(lol.ToString(), fff.ToString(), oppos.LocalName, fftemp, "true",xmlDoc, root);
                    lol++;
                    get_Attributecomment(oppos, conn, fff.ToString(), fftemp, xmlattr, rootattr);
                }
                //----shareString.xml
                IEnumerable<OpenXmlElement> kkk = document.WorkbookPart.SharedStringTablePart.SharedStringTable.Elements();//到达sharedStrings.xml文
                foreach (OpenXmlElement oppos in kkk)
                {
                    if (oppos.LocalName == "si")
                    {
                        shareString.Add(oppos);
                    }
                }
                //----style.xml

                IEnumerable<OpenXmlElement> fuck1 = document.WorkbookPart.WorkbookStylesPart.Stylesheet.Elements();
                foreach (OpenXmlElement node in fuck1)
                {
                    if (node.LocalName == "cellXfs")
                    {
                        foreach (OpenXmlElement node1 in node)
                        {
                            cellXfs.Add(node1);
                        }
                    }
                    if (node.LocalName == "fonts")
                    {
                        foreach (OpenXmlElement node1 in node)
                        {
                            fonts.Add(node1);
                        }
                    }
                    if (node.LocalName == "fills")
                    {
                        foreach (OpenXmlElement node1 in node)
                        {
                            fills.Add(node1);
                        }
                    }
                    if (node.LocalName == "cellStyles")
                    {
                        int count = 0; int id = 0;
                        foreach (OpenXmlAttribute attr in node.GetAttributes())
                        {
                            if (attr.LocalName == "count")
                            {
                                count = int.Parse(attr.Value);
                            }
                        }
                        gg = new OpenXmlElement[count];
                        foreach (OpenXmlElement node1 in node)
                        {
                            foreach (OpenXmlAttribute attr1 in node1.GetAttributes())
                            {
                                if (attr1.LocalName == "xfId")
                                {
                                    id = int.Parse(attr1.Value);
                                    gg[id] = node1;
                                }
                            }
                        }
                    }
                }
                List<String> work = getSheet(path);
                int[] pictids = new int[work.Count];
                for (int k = 0; k < work.Count; k++)
                {
                    Createroot(lol.ToString(), "0", work[k], work[k], "false", xmlDoc, root);
                    int sheetid = lol;
                    pictids[k] = sheetid;
                    lol++;
                    WorkbookPart wbPart = document.WorkbookPart;
                    Sheet theSheet = wbPart.Workbook.Descendants<Sheet>().
                    Where(s => s.Name == work[k]).FirstOrDefault();
                    WorksheetPart sheet = (WorksheetPart)(wbPart.GetPartById(theSheet.Id));
                    IEnumerable<OpenXmlElement> nodes = sheet.RootElement;
                    string depth = work[k] + "/" + "单元格属性"+"/" ;
                    foreach (OpenXmlElement node in nodes)
                    {
                        int temp = 0;
                        if (node.LocalName == "sheetData")
                        {
                            if (node.HasChildren)
                            {
                                string pre8 = work[k] + "/" + "单元格属性";
                                Createroot(lol.ToString(), sheetid.ToString(), "单元格属性", pre8, "false", xmlDoc, root);
                                lol++;
                                temp = lol - 1;
                            }
                            foreach (OpenXmlElement node111 in node)
                            {
                               
                                foreach (OpenXmlElement node1112 in node111)
                                {
                                    if (node1112.LocalName == "c")
                                    {
                                        success = false;
                                        get_Attributesheet(node1112, conn, depth,temp,xmlDoc,root,xmlattr,rootattr);
                                       
                                    }
                                }

                            }
                   }
                        if (node.LocalName == "headerFooter")
                        {
                            string prefix=work[k] + "/" + "页眉页脚";
                            Createroot(lol.ToString(), sheetid.ToString(), "页眉页脚", prefix, "true", xmlDoc, root);
                            lol++;
                            foreach (OpenXmlElement node1 in node)
                            {
                                get_Attributecomment(node1, conn, "0", prefix, xmlattr, rootattr);
                            }
                        }

                    }
                    //----表格测试ok
                    if (sheet.TableDefinitionParts != null)
                    {
                        string type = "表格";
                        int e = 1; int table = 0;
                        Boolean fuck = true;
                        foreach (var part in sheet.TableDefinitionParts)
                        {
                            if (fuck)
                            {
                                string pref = work[k] + "/" + "表格";
                                Createroot(lol.ToString(), sheetid.ToString(), "表格", pref, "false",  xmlDoc, root);
                                lol++;
                                table = lol - 1;
                                fuck = false;
                            }
                            string type11 = type + e;
                            string prefix = work[k] + "/" + type + "/" + type11;
                            Createroot(lol.ToString(), table.ToString(), type11, prefix, "true", xmlDoc, root);
                            lol++;
                            e++;
                            IEnumerable<OpenXmlElement> nodes123 = part.RootElement;
                            foreach (OpenXmlElement oppo12 in nodes123)
                            {
                                get_Attributecomment(oppo12, conn, "0", prefix, xmlattr, rootattr);
                            }
                            
                        }
                    }
                    //---------透视图ok
                    if (sheet.PivotTableParts != null)
                    {
                        Boolean fuck = true;
                        string type = "透视表";
                        int e = 1; int table1 = 0;
                        foreach (var part in sheet.PivotTableParts)
                        {
                            if (fuck)
                            {
                                string pref = work[k] + "/" + "透视表";
                                Createroot(lol.ToString(), sheetid.ToString(), "透视表", pref, "false", xmlDoc, root);
                                lol++;
                                table1 = lol - 1;
                                fuck = false;
                            }
                            string type11 = type + e;
                            string prefix = work[k] + "/" + type + "/" + type11;
                            Createroot(lol.ToString(), table1.ToString(), type11, prefix, "true", xmlDoc, root);
                          
                            lol++;
                            e++;
                            IEnumerable<OpenXmlElement> nodes123 = part.RootElement;
                            foreach (OpenXmlElement oppo12 in nodes123)
                            {
                                get_Attributecomment(oppo12, conn, "0", prefix, xmlattr, rootattr);
                            }

                            IEnumerable<OpenXmlElement> ok = part.PivotTableCacheDefinitionPart.RootElement;
                            foreach (OpenXmlElement oppo12 in ok)
                            {
                                get_Attributecomment(oppo12, conn, "0", prefix, xmlattr, rootattr);
                            }
                            IEnumerable<OpenXmlElement> ok1 = part.PivotTableCacheDefinitionPart.PivotTableCacheRecordsPart.RootElement;
                            foreach (OpenXmlElement oppo12 in ok1)
                            {
                                get_Attributecomment(oppo12, conn, "0", prefix, xmlattr, rootattr);
                            }
                        }
                    }
                    DrawingsPart aa = sheet.GetPartsOfType<DrawingsPart>().ToList().FirstOrDefault();
                    if (aa != null)
                    {
                        string pref = work[k] + "/" + "DrawingsPart";
                        Createroot(lol.ToString(), sheetid.ToString(), "DrawingsPart", pref, "false",  xmlDoc, root);
                      
                        lol++;
                        int ee = 1;
                        int table1 = lol - 1;
                        IEnumerable<OpenXmlElement> oppo1 = aa.RootElement; //----------图片的xml属性
                        foreach (OpenXmlElement node in oppo1)
                        {
                            if (node.LocalName == "twoCellAnchor")
                            {
                                string name111 = "twoCellAnchor" + ee;
                                string prefix = pref + "/" + name111;
                                Createroot(lol.ToString(),table1.ToString(),name111,prefix,"true",xmlDoc,root);
                           
                                lol++;
                                get_Attributecomment(node, conn, "0", prefix, xmlattr, rootattr);
                            
                            }
                            ee++;
                        }
                        //------------图表文件
                        if (aa.ChartParts != null)
                        {
                            Boolean fuck = true;
                            string type12 = "图表"; int e = 1; int reid = 0; int son = 0;
                            foreach (var part in aa.ChartParts)//拿到chart里的chart.xml
                            {
                                if (fuck)
                                {
                                    string pref1 = work[k] + "/" + type12;
                                    Createroot(lol.ToString(),sheetid.ToString(),"图表",pref1,"false",xmlDoc,root);
                                    lol++;
                                    reid = lol - 1;
                                    fuck = false;
                                }
                                string type11 = type12 + e;
                                string pref11 = work[k] + "/" + type12+"/"+type11;
                                Createroot(lol.ToString(),reid.ToString(),type11,pref11,"false",xmlDoc,root);
                              
                                lol++;
                                e++;
                                son = lol - 1;
                                string prefix1 = pref11 + "/" + "chart";
                                Createroot(lol.ToString(),son.ToString(),"chart",prefix1,"true",xmlDoc,root);
                              
                                lol++;
                                IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                foreach (OpenXmlElement node in oppo8)
                                {
                                    get_Attributecomment(node, conn, "0", prefix1, xmlattr, rootattr);
                                }
                                string prefix2 = pref11 + "/" + "colors";
                                Createroot(lol.ToString(), son.ToString(), "colors", prefix2, "true", xmlDoc, root);
                              
                                lol++;
                                if (part.ChartColorStyleParts != null)//xl\charts\colors.xml
                                {
                                    foreach (var part1 in part.ChartColorStyleParts)
                                    {
                                        IEnumerable<OpenXmlElement> oppo9 = part1.RootElement;
                                        foreach (OpenXmlElement node in oppo9)
                                        {
                                            get_Attributecomment(node, conn, "0", prefix2, xmlattr, rootattr);
                                        }
                                    }
                                }
                                string prefix3 = pref11 + "/" + "style";
                                Createroot(lol.ToString(), son.ToString(), "style", prefix3, "true", xmlDoc, root);
                               
                                lol++;
                                if (part.ChartColorStyleParts != null)//xl\charts\style.xml
                                {
                                    foreach (var part1 in part.ChartStyleParts)
                                    {
                                        IEnumerable<OpenXmlElement> oppo10 = part1.RootElement;
                                        foreach (OpenXmlElement node in oppo10)
                                        {
                                            get_Attributecomment(node, conn, "0", prefix3, xmlattr, rootattr);
                                        }

                                    }
                                }
                            }

                        }
                        //---------------diagrams文件
                        int son1 = 0; Boolean kk = false; string pref2=null;
                        if (aa.DiagramStyleParts != null)
                        {
                            Boolean fuck = true;
                            int diag = 0; string name = "形状"; int e = 1;
                            foreach (var part in aa.DiagramStyleParts)//DiagramStyle.xml
                            {
                                if (fuck)
                                {
                                    string pref1 = work[k] + "/" + name;
                                    Createroot(lol.ToString(), sheetid.ToString(), "形状(SmartArt)", pref1, "false", xmlDoc, root);
                                 
                                    lol++;
                                    diag = lol - 1;
                                    fuck = false;
                                }
                                string type11 = name + e;
                                pref2 = work[k] + "/" + name + "/" + type11;
                                Createroot(lol.ToString(),diag.ToString(),type11,pref2,"false",xmlDoc,root);
                             
                                lol++; e++;
                                son1 = lol - 1;
                                string prefix = pref2 + "/" + "quickStyle";
                                Createroot(lol.ToString(),son1.ToString(),"quickStyle",prefix,"true",xmlDoc,root);
                               
                                lol++;
                                IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                foreach (OpenXmlElement node in oppo8)
                                {
                                    get_Attributecomment(node, conn, "0", prefix, xmlattr, rootattr);
                                }
                               
                                kk = true;
                            }
                        }
                        if (aa.DiagramDataParts != null)
                        {
                            if (kk)
                            {
                                string frefix3 = pref2 + "/" + "data";
                                Createroot(lol.ToString(), son1.ToString(), "data", frefix3, "true",  xmlDoc, root);
                               
                                lol++;
                                foreach (var part in aa.DiagramDataParts)//xl\diagrams\data1.xml
                                {
                                    IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                    foreach (OpenXmlElement node in oppo8)
                                    {
                                        get_Attributecomment(node, conn, "0", frefix3, xmlattr, rootattr);
                                    }
                                }
                            }
                        }
                        if (aa.DiagramColorsParts != null)
                        {
                            if (kk)
                            {
                                string frefix3 = pref2 + "/" + "colors";
                                Createroot(lol.ToString(), son1.ToString(), "colors", frefix3, "true", xmlDoc, root);
                               
                                lol++;
                                foreach (var part in aa.DiagramColorsParts)//xl\diagrams\colors1.xml
                                {
                                    IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                    foreach (OpenXmlElement node in oppo8)
                                    {
                                        get_Attributecomment(node, conn, "0", frefix3, xmlattr, rootattr);
                                    }
                                }
                              
                            }
                        }
                        if (aa.DiagramLayoutDefinitionParts != null)
                        {
                            if (kk)
                            {
                                string frefix3 = pref2 + "/" + "layout";
                                Createroot(lol.ToString(), son1.ToString(), "layout", frefix3, "true", xmlDoc, root);
                           
                                lol++;
                                foreach (var part in aa.DiagramLayoutDefinitionParts)//xl\diagrams\layout1.xml
                                {
                                    IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                    foreach (OpenXmlElement node in oppo8)
                                    {
                                        get_Attributecomment(node, conn, "0", frefix3, xmlattr, rootattr);

                                    }

                                }
                               
                            }
                        }
                        if (aa.DiagramPersistLayoutParts != null)
                        {
                            if (kk)
                            {
                                string frefix3 = pref2 + "/" + "drawing";
                               
                                Createroot(lol.ToString(), son1.ToString(), "drawing", frefix3, "true",  xmlDoc, root);
                               
                                lol++;
                                foreach (var part in aa.DiagramPersistLayoutParts)//xl\diagrams\drawing1.xml
                                {
                                    IEnumerable<OpenXmlElement> oppo8 = part.RootElement;
                                    foreach (OpenXmlElement node in oppo8)
                                    {
                                        get_Attributecomment(node, conn, "0", frefix3, xmlattr, rootattr);

                                    }
                                }
                            }
                        }
                        //------------------提取图片
                        if (k == work.Count - 1)
                        {
                            int temp = 0;
                            var sheets = wbPart.Workbook.Sheets;
                            int cf = 0;
                            foreach (Sheet sheet1 in sheets)
                            {
                                int i = 1;
                                WorksheetPart wsPart = (WorksheetPart)wbPart.GetPartById(sheet1.Id);

                                DrawingsPart drawingPart1 = wsPart.GetPartsOfType<DrawingsPart>().ToList().FirstOrDefault();
                                if (drawingPart1.ImageParts != null)
                                {
                                    string typea = "图片";
                                    int e = 1;
                                    int picid = 0;
                                    Boolean fuck = true;
                                    foreach (var part in drawingPart1.ImageParts)
                                    {
                                        if (fuck)
                                        {
                                            string prefix = work[temp] + "/" + "图片";
                                            Createroot(lol.ToString(),  pictids[cf].ToString(), "图片", prefix, "false", xmlDoc, root);
                                           
                                            lol++;
                                            picid = lol - 1;
                                            fuck = false;
                                        }
                                        Image img1 = Image.FromStream(part.GetStream());
                                        string name = tempTestid + "_" + work[temp] + "_" + i + ".jpg"; ;
                                        string p = picturepath + name;
                                        img1.Save(p);
                                        i++;
                                        string type11 = typea + e;
                                        string prefix12 = work[temp] + "/" + "图片" + "/" + type11;
                                        Createrootpicture(lol.ToString(), picid.ToString(), type11, prefix12, "false",name, xmlDoc, root);
                                        lol++;
                                        int pson=lol-1;
                                        string pname=prefix12+"/资源文件";
                                        Createroot(lol.ToString(),pson.ToString(),"资源文件",pname,"true",xmlDoc,root);
                                        lol++;
                                        Createrootattr( "0", pname, "资源文件", name, xmlattr, rootattr);
                                        e++;
                                    }
                                }

                                cf++; temp++;
                            }
                        }

                    }
                    WorksheetCommentsPart comment = sheet.GetPartsOfType<WorksheetCommentsPart>().ToList().FirstOrDefault();//---批注
                    if (comment != null)
                    {
                        string name = work[k] + "/" + "批注";
                        Createroot(lol.ToString(), sheetid.ToString(), "批注", name, "true",  xmlDoc, root);
                       
                        lol++;
                        IEnumerable<OpenXmlElement> ok = comment.RootElement;
                        foreach (OpenXmlElement oppo2 in ok)
                        {
                            get_Attributecomment(oppo2, conn, "0", name, xmlattr, rootattr);
                        }
                    }

                }
                //-----------------------theme
                Createroot(lol.ToString(), "0", "主题", "主题", "false", xmlDoc, root);
         
                lol++;
                int themeid = lol - 1;
                IEnumerable<OpenXmlElement> theme = document.WorkbookPart.ThemePart.Theme.Elements();
                foreach (OpenXmlElement node in theme)
                {
                    if (node.LocalName == "themeElements")
                    {
                        foreach (OpenXmlElement oppo1 in node)
                        {
                            string prefix = "主题" + "/" + oppo1.LocalName;
                            Createroot(lol.ToString(),themeid.ToString(),oppo1.LocalName,prefix,"true",xmlDoc,root);
                            lol++;
                            get_Attributecomment(oppo1, conn, "0", prefix, xmlattr, rootattr);
                        }
                    }

                }

                
            }
            totalTime = System.DateTime.Now.TimeOfDay.TotalSeconds - totalTime;
            Console.WriteLine("总耗时：" + totalTime + " s");
            xmlDoc.Save(path1);
            xmlattr.Save(path2);
            lol = 1;
            chineseattr.Clear();
        }
    }
}