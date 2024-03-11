import * as React from 'react';

const BieumauTest = () => {
    const htmlContent = `
    <!-- Paste the HTML content from BieumauTest.html here -->

    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="generator" content="PhpSpreadsheet, https://github.com/PHPOffice/PhpSpreadsheet">
  <title>Office 2003 XLS Document</title>
  <meta name="author" content="BIZSOFT CORP." />
  <meta name="title" content="Office 2003 XLS Document" />
  <meta name="description" content="Created by BIZSOFT Sofware" />
  <meta name="subject" content="Office 2003 XLS Document" />
  <meta name="keywords" content="office 2003 openxml" />
  <meta name="category" content="File is created by Software" />
  <meta name="company" content="Microsoft Corporation" />
  <style type="text/css">
    html {
      font-family: Calibri, Arial, Helvetica, sans-serif;
      font-size: 11pt;
      background-color: white
    }

    a.comment-indicator:hover+div.comment {
      background: #ffd;
      position: absolute;
      display: block;
      border: 1px solid black;
      padding: 0.5em
    }

    a.comment-indicator {
      background: red;
      display: inline-block;
      border: 1px solid black;
      width: 0.5em;
      height: 0.5em
    }

    div.comment {
      display: none
    }

    table {
      border-collapse: collapse;
      page-break-after: always
    }

    .gridlines td {
      border: 1px dotted black
    }

    .gridlines th {
      border: 1px dotted black
    }

    .b {
      text-align: center
    }

    .e {
      text-align: center
    }

    .f {
      text-align: right
    }

    .inlineStr {
      text-align: left
    }

    .n {
      text-align: right
    }

    .s {
      text-align: left
    }

    td.style0 {
      vertical-align: bottom;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    th.style0 {
      vertical-align: bottom;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    td.style1 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style1 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style2 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style2 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style3 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style3 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style4 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style4 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style5 {
      vertical-align: middle;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style5 {
      vertical-align: middle;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style6 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style6 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style7 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style7 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style8 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style8 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style9 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style9 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style10 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style10 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style11 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style11 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style12 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style12 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style13 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style13 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style14 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style14 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style15 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style15 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style16 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style16 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style17 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style17 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style18 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style18 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style19 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style19 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style20 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style20 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style21 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style21 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style22 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style22 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style23 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style23 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style24 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style24 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style25 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style25 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style26 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style26 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style27 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style27 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style28 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style28 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style29 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style29 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style30 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style30 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style31 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style31 {
      vertical-align: top;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-style: italic;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style32 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style32 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style33 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style33 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style34 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style34 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style35 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style35 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style36 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style36 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style37 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style37 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style38 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style38 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style39 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style39 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style40 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style40 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style41 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style41 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style42 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style42 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style43 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style43 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style44 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style44 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style45 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style45 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style46 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style46 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style47 {
      vertical-align: top;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style47 {
      vertical-align: top;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style48 {
      vertical-align: top;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style48 {
      vertical-align: top;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style49 {
      vertical-align: top;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style49 {
      vertical-align: top;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style50 {
      vertical-align: top;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style50 {
      vertical-align: top;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style51 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style51 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style52 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style52 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style53 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style53 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style54 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style54 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style55 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style55 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style56 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style56 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style57 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style57 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style58 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style58 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style59 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style59 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style60 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style60 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style61 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style61 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style62 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style62 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style63 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style63 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style64 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style64 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style65 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style65 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style66 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style66 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style67 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style67 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style68 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style68 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style69 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    th.style69 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFFFF
    }

    td.style70 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style70 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style71 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style71 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style72 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style72 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style73 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style73 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style74 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style74 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style75 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style75 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style76 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style76 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dotted #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style77 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style77 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style78 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style78 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style79 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    th.style79 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #BFBFBF
    }

    td.style80 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style80 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style81 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style81 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style82 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style82 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style83 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style83 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style84 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style84 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style85 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style85 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style86 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style86 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style87 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style87 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style88 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style88 {
      vertical-align: top;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style89 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style89 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style90 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style90 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style91 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style91 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style92 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style92 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style93 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style93 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style94 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style94 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dashed #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style95 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style95 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style96 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style96 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style97 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style97 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style98 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style98 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style99 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style99 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px dashed #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style100 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style100 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style101 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style101 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style102 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style102 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style103 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style103 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style104 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style104 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px dotted #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style105 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style105 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style106 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style106 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style107 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style107 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style108 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style108 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style109 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style109 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style110 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style110 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style111 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style111 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style112 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style112 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style113 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style113 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style114 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style114 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style115 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style115 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style116 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style116 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style117 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style117 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style118 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style118 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style119 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style119 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style120 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style120 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style121 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style121 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style122 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style122 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style123 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style123 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style124 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style124 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style125 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style125 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style126 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style126 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style127 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style127 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style128 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style128 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style129 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style129 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style130 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style130 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style131 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style131 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style132 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style132 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style133 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style133 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style134 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style134 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style135 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style135 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style136 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style136 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style137 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style137 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style138 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style138 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style139 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style139 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style140 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style140 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style141 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style141 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style142 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style142 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style143 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style143 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style144 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style144 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style145 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    th.style145 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #C0C0C0
    }

    td.style146 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style146 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style147 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style147 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style148 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style148 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style149 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style149 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style150 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style150 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style151 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style151 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style152 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style152 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style153 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style153 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style154 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style154 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style155 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    th.style155 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    td.style156 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    th.style156 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Calibri';
      font-size: 11pt;
      background-color: white
    }

    td.style157 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style157 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style158 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style158 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style159 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style159 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style160 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style160 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style161 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style161 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style162 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    th.style162 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 20pt;
      background-color: white
    }

    td.style163 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style163 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style164 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style164 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style165 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style165 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style166 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style166 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style167 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style167 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style168 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style168 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 2px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style169 {
      vertical-align: bottom;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style169 {
      vertical-align: bottom;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style170 {
      vertical-align: bottom;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style170 {
      vertical-align: bottom;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: 2px solid #000000 !important;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style171 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style171 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style172 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style172 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style173 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style173 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style174 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style174 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style175 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style175 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style176 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style176 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style177 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style177 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style178 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style178 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style179 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style179 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style180 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style180 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style181 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style181 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style182 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style182 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style183 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style183 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style184 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style184 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 2px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style185 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style185 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style186 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    th.style186 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: white
    }

    td.style187 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style187 {
      vertical-align: middle;
      text-align: center;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style188 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style188 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style189 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style189 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style190 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style190 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style191 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style191 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style192 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style192 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style193 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style193 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style194 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style194 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style195 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style195 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style196 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style196 {
      vertical-align: middle;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style197 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style197 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style198 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style198 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style199 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style199 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style200 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style200 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style201 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style201 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style202 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style202 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style203 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style203 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style204 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style204 {
      vertical-align: bottom;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style205 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style205 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style206 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style206 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style207 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style207 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style208 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style208 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style209 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style209 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style210 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style210 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style211 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style211 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style212 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style212 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style213 {
      vertical-align: middle;
      text-align: right;
      padding-right: 0px;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style213 {
      vertical-align: middle;
      text-align: right;
      padding-right: 0px;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style214 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style214 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: none #000000;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style215 {
      vertical-align: middle;
      text-align: right;
      padding-right: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style215 {
      vertical-align: middle;
      text-align: right;
      padding-right: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style216 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style216 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 1px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style217 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style217 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style218 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style218 {
      vertical-align: middle;
      text-align: left;
      padding-left: 0px;
      border-bottom: 2px solid #000000 !important;
      border-top: none #000000;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style219 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style219 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 2px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style220 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style220 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style221 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style221 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style222 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style222 {
      vertical-align: bottom;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style223 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style223 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style224 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style224 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 2px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style225 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style225 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style226 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style226 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style227 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style227 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style228 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style228 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style229 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style229 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style230 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style230 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: 1px solid #000000 !important;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style231 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style231 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: none #000000;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    td.style232 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    th.style232 {
      vertical-align: middle;
      text-align: center;
      border-bottom: 1px solid #000000 !important;
      border-top: 1px solid #000000 !important;
      border-left: none #000000;
      border-right: 1px solid #000000 !important;
      font-weight: bold;
      color: #000000;
      font-family: 'Times New Roman';
      font-size: 10pt;
      background-color: #FFFF00
    }

    table.sheet0 col.col0 {
      width: 39.31111066pt
    }

    table.sheet0 col.col1 {
      width: 35.92222181pt
    }

    table.sheet0 col.col2 {
      width: 37.27777735pt
    }

    table.sheet0 col.col3 {
      width: 37.27777735pt
    }

    table.sheet0 col.col4 {
      width: 26.43333303pt
    }

    table.sheet0 col.col5 {
      width: 32.53333296pt
    }

    table.sheet0 col.col6 {
      width: 42pt
    }

    table.sheet0 col.col7 {
      width: 42pt
    }

    table.sheet0 col.col8 {
      width: 42pt
    }

    table.sheet0 col.col9 {
      width: 42pt
    }

    table.sheet0 col.col10 {
      width: 42pt
    }

    table.sheet0 col.col11 {
      width: 42pt
    }

    table.sheet0 tr {
      height: 15pt
    }

    table.sheet0 tr.row2 {
      height: 15.75pt
    }

    table.sheet0 tr.row3 {
      height: 15.75pt
    }

    table.sheet0 tr.row7 {
      height: 15.75pt
    }

    table.sheet0 tr.row9 {
      height: 25.5pt
    }

    table.sheet0 tr.row18 {
      height: 51.75pt
    }

    table.sheet0 tr.row25 {
      height: 15.75pt
    }

    table.sheet0 tr.row31 {
      height: 15.75pt
    }

    table.sheet0 tr.row37 {
      height: 15.75pt
    }

    table.sheet0 tr.row56 {
      height: 15.75pt
    }

    table.sheet0 tr.row58 {
      height: 25.5pt
    }

    table.sheet0 tr.row59 {
      height: 76.5pt
    }

    table.sheet0 tr.row67 {
      height: 15.75pt
    }
  </style>
</head>

<body>
  <style>
    @page {
      margin-left: 0.4in;
      margin-right: 0.29in;
      margin-top: 0.3in;
      margin-bottom: 0.75in;
    }

    body {
      margin-left: 0.4in;
      margin-right: 0.29in;
      margin-top: 0.3in;
      margin-bottom: 0.75in;
    }
  </style>
  <table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
    <col class="col0">
    <col class="col1">
    <col class="col2">
    <col class="col3">
    <col class="col4">
    <col class="col5">
    <col class="col6">
    <col class="col7">
    <col class="col8">
    <col class="col9">
    <col class="col10">
    <col class="col11">
    <tbody>
      <tr class="row0">
        <td class="column0 style155 s style155" colspan="3">
          <div style="position: relative;"><img
              style="position: absolute; z-index: 1; left: 27px; top: 5px; width: 172px; height: 0px;"
              src="zip:///home/CloudConvertio/tmp/in_work/502efcaa1148430ed28f5bf0a05d837f.xlsx#xl/media/image1.png"
              border="0" /></div>system_office_logo
        </td>
        <td class="column3 style157 s style158" colspan="9">HỒ SƠ ỨNG VIÊN</td>
      </tr>
      <tr class="row3">
        <td class="column0 style163 s style165" colspan="12">Nguồn:Thục Anh Ngày đăng ký: 15/11/2022 Mã số: LD-1689</td>
      </tr>
      <tr class="row4">
        <td class="column0 style1 s">Họ và tên</td>
        <td class="column1 style171 null style173" colspan="3"></td>
        <td class="column4 style166 s style167" colspan="2">Ngày sinh</td>
        <td class="column6 style177 null style179" colspan="3"></td>
        <td class="column9 style183 s style184" colspan="2">Tuổi:</td>
        <td class="column11 style168 s style170" rowspan="4">(ảnh)</td>
      </tr>
      <tr class="row5">
        <td class="column0 style2 s">CMTND</td>
        <td class="column1 style174 null style176" colspan="3"></td>
        <td class="column4 style70 s style117" colspan="2">ngày cấp</td>
        <td class="column6 style180 null style182" colspan="3"></td>
        <td class="column9 style185 s style186" colspan="2">Nơi cấp:</td>
      </tr>
      <tr class="row6">
        <td class="column0 style2 s">Dân tộc</td>
        <td class="column1 style188 s">...</td>
        <td class="column2 style15 s">Tôn giáo:</td>
        <td class="column3 style187 s">...</td>
        <td class="column4 style189 s style191" colspan="5">Điện thoại di động: </td>
        <td class="column9 style190 s style192" colspan="2">SĐT người thân: </td>
      </tr>
      <tr class="row7">
        <td class="column0 style3 s">Địa chỉ </td>
        <td class="column1 style193 s style195" colspan="10">Thôn/Ấp, Xã/Phường, ..., 8</td>
      </tr>
      <tr class="row8">
        <td class="column0 style118 s style120" colspan="12">Thành phần gia đình</td>
      </tr>
      <tr class="row9">
        <td class="column0 style4 s">Quan Hệ</td>
        <td class="column1 style17 s">Sống chung</td>
        <td class="column2 style71 s style117" colspan="3">Họ Tên</td>
        <td class="column5 style17 s">Năm sinh</td>
        <td class="column6 style17 s">Nơi làm việc</td>
        <td class="column7 style17 s">Nghề Nghiệp</td>
        <td class="column8 style17 s">Sức khỏe</td>
        <td class="column9 style117 s style154" colspan="3">Có người thân, bạn bè tại Nhật không</td>
      </tr>
      <tr class="row10">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style199 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style200 s">Có ...</td>
        <td class="column10 style197 s style201" colspan="2">Không ...</td>
      </tr>
      <tr class="row11">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style199 null"></td>
        <td class="column7 style199 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style202 s">Quan hệ: ...</td>
        <td class="column10 style203 s style204" colspan="2">Thời gian<br />
          tại Nhật: ...</td>
      </tr>
      <tr class="row12">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style199 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style205 s style208" rowspan="2">Nơi làm việc: <br />
          ...</td>
        <td class="column10 style206 s style207" colspan="2">ĐT/FB: ...</td>
      </tr>
      <tr class="row13">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style199 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column10 style209 s style210" colspan="2">Họ tên:...</td>
      </tr>
      <tr class="row14">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style198 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style181 s style212" colspan="3">Tình trạng hôn nhân</td>
      </tr>
      <tr class="row15">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style198 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style213 s">☑ Độc thân</td>
        <td class="column10 style213 s">☐</td>
        <td class="column11 style214 s">Ly hôn</td>
      </tr>
      <tr class="row16">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style198 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style213 s">☐ Kết hôn </td>
        <td class="column10 style215 s">&nbsp;&nbsp;☐ Khác</td>
        <td class="column11 style216 s">Góa</td>
      </tr>
      <tr class="row17">
        <td class="column0 style196 null"></td>
        <td class="column1 style188 s">☐</td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style198 null"></td>
        <td class="column6 style198 null"></td>
        <td class="column7 style198 null"></td>
        <td class="column8 style198 null"></td>
        <td class="column9 style131 s style132" colspan="3">Đi nhật gia đình có đồng ý không</td>
      </tr>
      <tr class="row18">
        <td class="column0 style5 null"></td>
        <td class="column1 style16 s">☐</td>
        <td class="column2 style107 null style109" colspan="3"></td>
        <td class="column5 style6 null"></td>
        <td class="column6 style6 null"></td>
        <td class="column7 style6 null"></td>
        <td class="column8 style6 null"></td>
        <td class="column9 style217 s style217" colspan="2">... Có</td>
        <td class="column11 style218 s">... Không</td>
      </tr>
      <tr class="row19">
        <td class="column0 style142 s style144" colspan="9">Lý lịch học tập</td>
        <td class="column9 style145 s style120" colspan="3">Chứng chỉ, bằng cấp</td>
      </tr>
      <tr class="row20">
        <td class="column0 style121 s style146" colspan="2">Thời gian<br />
          <span style="font-style:italic; color:#000000; font-family:'Times New Roman'; font-size:10pt">tháng/năm-
            tháng/năm</span>
        </td>
        <td class="column2 style149 s style146" colspan="7">Tên trường<br />
          <span style="font-style:italic; color:#000000; font-family:'Times New Roman'; font-size:10pt">(khai từ cấp 2
            trở lên)</span>
        </td>
        <td class="column9 style151 s style151">Chuyên Ngành </td>
        <td class="column10 style151 s style152" colspan="2">Bằng cấp </td>
      </tr>
      <tr class="row22">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style221 null style220" colspan="7"></td>
        <td class="column9 style198 null"></td>
        <td class="column10 style223 null style224" colspan="2"></td>
      </tr>
      <tr class="row23">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style221 null style220" colspan="7"></td>
        <td class="column9 style198 null"></td>
        <td class="column10 style223 null style224" colspan="2"></td>
      </tr>
      <tr class="row24">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style221 null style220" colspan="7"></td>
        <td class="column9 style199 null"></td>
        <td class="column10 style223 null style224" colspan="2"></td>
      </tr>
      <tr class="row25">
        <td class="column0 style105 s style106" colspan="2">...-...</td>
        <td class="column2 style137 null style139" colspan="7"></td>
        <td class="column9 style6 null"></td>
        <td class="column10 style140 null style141" colspan="2"></td>
      </tr>
      <tr class="row26">
        <td class="column0 style118 s style120" colspan="12">Kinh nghiệm làm việc trong nước</td>
      </tr>
      <tr class="row27">
        <td class="column0 style136 s style135" colspan="2">Thời gian<br />
          <span style="font-style:italic; color:#000000; font-family:'Times New Roman'; font-size:10pt">tháng/năm-
            tháng/năm</span><span
            style="font-weight:bold; color:#000000; font-family:'Times New Roman'; font-size:10pt"><br />
          </span>
        </td>
        <td class="column2 style70 s style117" colspan="3">Tên công ty </td>
        <td class="column5 style70 s style117" colspan="5">Miêu tả công việc</td>
        <td class="column10 style70 s style72" colspan="2">Lý do thôi việc</td>
      </tr>
      <tr class="row28">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style225 null style227" colspan="3"></td>
        <td class="column5 style223 null style229" colspan="5"></td>
        <td class="column10 style197 null style201" colspan="2"></td>
      </tr>
      <tr class="row29">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style230 null style232" colspan="3"></td>
        <td class="column5 style197 null style182" colspan="5"></td>
        <td class="column10 style197 null style201" colspan="2"></td>
      </tr>
      <tr class="row30">
        <td class="column0 style219 null style220" colspan="2"></td>
        <td class="column2 style197 null style182" colspan="3"></td>
        <td class="column5 style197 null style182" colspan="5"></td>
        <td class="column10 style197 null style201" colspan="2"></td>
      </tr>
      <tr class="row31">
        <td class="column0 style105 null style106" colspan="2"></td>
        <td class="column2 style70 null style117" colspan="3"></td>
        <td class="column5 style107 null style109" colspan="5"></td>
        <td class="column10 style107 null style110" colspan="2"></td>
      </tr>
      <tr class="row32">
        <td class="column0 style118 s style120" colspan="12">Kinh nghiệm làm việc ngoài nước</td>
      </tr>
      <tr class="row33">
        <td class="column0 style121 s style122" colspan="2">Thời gian<br />
          <span style="font-style:italic; color:#000000; font-family:'Times New Roman'; font-size:10pt">tháng/năm-
            tháng/năm</span>
        </td>
        <td class="column2 style125 s style125">Tên nước </td>
        <td class="column3 style127 s style122" colspan="3">Tên công ty</td>
        <td class="column6 style129 s style122" colspan="4">Miêu tả Công việc</td>
        <td class="column10 style131 s style132" colspan="2">Lý do về nước</td>
      </tr>
      <tr class="row35">
        <td class="column0 style105 null style106" colspan="2"></td>
        <td class="column2 style7 null"></td>
        <td class="column3 style71 null style117" colspan="3"></td>
        <td class="column6 style70 null style117" colspan="4"></td>
        <td class="column10 style71 null style72" colspan="2"></td>
      </tr>
      <tr class="row36">
        <td class="column0 style105 null style106" colspan="2"></td>
        <td class="column2 style8 null"></td>
        <td class="column3 style70 null style117" colspan="3"></td>
        <td class="column6 style70 null style117" colspan="4"></td>
        <td class="column10 style71 null style72" colspan="2"></td>
      </tr>
      <tr class="row37">
        <td class="column0 style105 null style106" colspan="2"></td>
        <td class="column2 style9 null"></td>
        <td class="column3 style107 null style109" colspan="3"></td>
        <td class="column6 style107 null style109" colspan="4"></td>
        <td class="column10 style108 null style110" colspan="2"></td>
      </tr>
      <tr class="row38">
        <td class="column0 style10 s">Sở thích:</td>
        <td class="column1 style111 s style113" colspan="5">...</td>
        <td class="column6 style11 s">Nhược điểm:</td>
        <td class="column7 style14 null"></td>
        <td class="column8 style114 s style116" colspan="4">...</td>
      </tr>
      <tr class="row39">
        <td class="column0 style89 s style91" colspan="4">Sở trường, chuyên môn</td>
        <td class="column4 style92 s style94" colspan="8">Tự nhận xét tính cách bản thân</td>
      </tr>
      <tr class="row40">
        <td class="column0 style95 s style97" colspan="4">...</td>
        <td class="column4 style98 s style99" colspan="8">...</td>
      </tr>
      <tr class="row41">
        <td class="column0 style100 s style102" colspan="9">Vì sao muốn đi Nhật</td>
        <td class="column9 style103 s style104" colspan="3">Thu nhập gia đình 1 tháng bao nhiêu?</td>
      </tr>
      <tr class="row42">
        <td class="column0 style73 s style75" colspan="9">...</td>
        <td class="column9 style74 s style76" colspan="3">…...…..triệu đồng</td>
      </tr>
      <tr class="row43">
        <td class="column0 style77 s style79" colspan="12">NGUYỆN VỌNG ĐĂNG KÝ NGÀNH NGHỀ DỰ TUYỂN</td>
      </tr>
      <tr class="row44">
        <td class="column0 style80 s style82" colspan="12">Đã từng học tiếng Nhật chưa? Học trong bao lâu ? Ở đâu? ...
        </td>
      </tr>
      <tr class="row45">
        <td class="column0 style83 s style85" colspan="12">Đã từng dự tuyển đơn hàng Nhật nào chưa ? Ngành nghề tuyển ?
          Bao giờ ? Ở đâu ?<br />
          ...</td>
      </tr>
      <tr class="row47">
        <td class="column0 style54 s style55" colspan="12">Đã từng nộp hồ sơ đi TTS Nhật Bản ở cty nào chưa ? ...</td>
      </tr>
      <tr class="row48">
        <td class="column0 style54 s style55" colspan="12">Đã từng gửi hồ sơ đi du học Nhật chưa( bằng cấp, học bạ, CMT
          )? ...</td>
      </tr>
      <tr class="row49">
        <td class="column0 style54 s style55" colspan="12">Đã từng nộp hồ sơ xin visa vào Nhật chưa? ...</td>
      </tr>
      <tr class="row50">
        <td class="column0 style54 s style55" colspan="12">Nếu có, xin visa theo tư cách nào? ...</td>
      </tr>
      <tr class="row51">
        <td class="column0 style54 s style41" colspan="9">Sau khi về nước muốn có bao nhiêu tiền?</td>
        <td class="column9 style70 s style72" colspan="3">... triệu đồng</td>
      </tr>
      <tr class="row52">
        <td class="column0 style54 s style55" colspan="12">Sau khi về nước muốn làm việc gì? ...</td>
      </tr>
      <tr class="row53">
        <td class="column0 style54 s style55" colspan="12">Bạn đã có từng sống tập thể chưa ? Có: ... Không: ...</td>
      </tr>
      <tr class="row54">
        <td class="column0 style54 s style55" colspan="12">Biết đến Công ty qua đâu? ...</td>
      </tr>
      <tr class="row55">
        <td class="column0 style54 s style55" colspan="12">Đã nộp tiền cho ai? ...</td>
      </tr>
      <tr class="row56">
        <td class="column0 style56 s style58" colspan="12">Số tiền là: ... Ngày nộp: ...</td>
      </tr>
      <tr class="row57">
        <td class="column0 style59 s style61" colspan="12">THÔNG TIN SƠ TUYỂN</td>
      </tr>
      <tr class="row58">
        <td class="column0 style62 s style65" colspan="2" rowspan="2">Chiều cao (Cm) 154 </td>
        <td class="column2 style53 s style66" colspan="2" rowspan="2">Cân nặng (kg) 45 </td>
        <td class="column4 style67 s style69" colspan="5">Thị lực (không có kính): P:..1.5...T: 1.5</td>
        <td class="column9 style18 s">Mù Màu</td>
        <td class="column10 style19 s">Tay thuận</td>
        <td class="column11 style12 s">Nhóm máu</td>
      </tr>
      <tr class="row59">
        <td class="column4 style67 s style69" colspan="5">Thị lực (có kính): P:... T:...</td>
        <td class="column9 style13 s">Có: ... Không: ...</td>
        <td class="column10 style18 s">Tay phải</td>
        <td class="column11 style12 s">O</td>
      </tr>
      <tr class="row60">
        <td class="column0 style45 s style46" colspan="5">Mồ hôi tay: Không ... Một chút ... Nhiều ...</td>
        <td class="column5 style33 s style46" colspan="5">Uống rượu: Không ☑ Có ☐</td>
        <td class="column10 style47 s style50" colspan="2" rowspan="2">Bệnh lý đặc biệt:<br />
          {benhlydacbiet}</td>
      </tr>
      <tr class="row61">
        <td class="column0 style45 s style46" colspan="5">Sợ độ cao: Không ... Có ...</td>
        <td class="column5 style33 s style46" colspan="5">Hút thuốc: Không ☑ Có ☐ {sodieuthuoctrongngay} điếu/ngày</td>
      </tr>
      <tr class="row62">
        <td class="column0 style51 s style51" rowspan="2">Hình xăm:</td>
        <td class="column1 style33 s style46" colspan="2">Có ...</td>
        <td class="column3 style52 s style53" colspan="3">Chi tiết: ...</td>
        <td class="column6 style33 s style35" colspan="6">Dị tật: Không ... có ... chi tiết: ...</td>
      </tr>
      <tr class="row63">
        <td class="column1 style33 s style46" colspan="2">Không ...</td>
        <td class="column3 style32 s style32" colspan="3">Người KT: ...</td>
        <td class="column6 style33 s style35" colspan="6">Phẫu thuật: Không ... có ... chi tiết: ...</td>
      </tr>
      <tr class="row64">
        <td class="column0 style36 s style38" colspan="3">Hộ chiếu C-12345678</td>
        <td class="column3 style38 s style38" colspan="3">Test viêm gan B ...</td>
        <td class="column6 style39 s style41" colspan="3">Khám sức khỏe ...</td>
        <td class="column9 style42 s style44" colspan="3">Ghi chú: {ghichubosung}</td>
      </tr>
      <tr class="row65">
        <td class="column0 style20 s style22" colspan="12">Tôi xin cam kết những lời khai trên đây là hoàn toàn đúng sự
          thật và có thể chứng thực, nếu sai tôi xin hoàn toàn chịu mọi trách nhiệm.</td>
      </tr>
      <tr class="row66">
        <td class="column0 style23 s style24" colspan="3">Nhân viên hướng dẫn</td>
        <td class="column3 style24 s style24" colspan="3">Nhân viên kiểm soát</td>
        <td class="column6 style25 s style25" colspan="4">Nhân viên nhập liệu</td>
        <td class="column10 style24 s style26" colspan="2">Người Khai</td>
      </tr>
      <tr class="row67">
        <td class="column0 style27 s style28" colspan="3">(ký ghi rõ họ tên)</td>
        <td class="column3 style29 s style28" colspan="3">(ký ghi rõ họ tên)</td>
        <td class="column6 style29 s style29" colspan="4">(ký ghi rõ họ tên)</td>
        <td class="column10 style30 s style31" colspan="2">(ký ghi rõ họ tên)<br />
          NGUYỄN DIỆU LINH </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
  `;

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default BieumauTest;