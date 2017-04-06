package com.itgmapp.service.jriaccess;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

import com.itgmapp.domain.User;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Base64;
import java.util.Arrays;
import java.util.Date;

public class Itgmrest {

    public static String local = ":8090/ITGMRest2/webresources/jriaccess/";
    public static String urlIP = "http://www.miqueiasfernandes.com.br/p/ip-itgm-rest.html";
    public static String IP = null;
    public static Long time;
    public static int hours_to_update_ip = 1;

    public static void createUser(User user) {
        String codnome = getCodNome(user);
        boolean success = sendText(codnome + "/*/*/*/" + "user.data", "desc/", user.toString());
        System.out.println("Usuario: " + codnome + " criado com " + (success ? "sucesso." : "erro."));
    }

    public static String getCodNome(User user) {
        return new String(Base64.getEncoder().encodeToString(
                (user.getLogin()).getBytes()
        )).replaceAll("\\W", "");
    }

    public static String getIP() {
        if (IP == null || (time + (1000 * 60 * 60 * hours_to_update_ip)) < new Date().getTime()) {
            String pagina = new RestTemplate().getForObject(urlIP, String.class);
            String[] ip = pagina.split("segue o ip para acesso ao ITGM Rest ");
            IP = ip[1].substring(0, ip[1].indexOf(":"));
            time = new Date().getTime();
        }
        return IP;
    }

    public static boolean sendText(String url, String subdir, String content) {
        RestTemplate rt = new RestTemplate();
        String uri = new String(
                "http://" + getIP() + local
                + url
                + "?subdiretorio=" + subdir);
        String ret = rt.postForObject(uri, content, String.class);
        return "true".equals(ret);
    }

    public static boolean sendFile(String url, String subdir, Object file) {
        RestTemplate rt = new RestTemplate();
        String uri = new String(
                "http://" + getIP() + local
                + url
                + "?&subdiretorio=" + subdir);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setAccept(Arrays.asList(new MediaType[]{MediaType.TEXT_PLAIN}));

        HttpEntity<byte[]> entity = null;
        try {
            entity = new HttpEntity<byte[]>(
                    ((MultipartFile) (file)).getBytes(),
                    headers);
        } catch (Exception ex) {
            System.err.println("itgmrest:81 errror entity: " + ex);
        }
        return "true".equals(rt.postForObject(uri, entity, String.class));
    }

    public static File convert(MultipartFile file) {
        File convFile = new File(file.getOriginalFilename());
        try {
            convFile.createNewFile();
            FileOutputStream fos;
            fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();
        } catch (Exception ex) {
            System.err.println("not saving file: " + ex);
            return null;
        }
        return convFile;
    }

    public static String getFileExt(String fName) {
        return fName == null ? fName : (fName.contains(".") ? ("." + fName.replaceAll("^.*\\.", "")) : "");
    }

    public static String publicFile(
            String usuario,
            String projeto,
            String cenario,
            String diretorio,
            String subdiretorio,
            String file) {
        RestTemplate rt = new RestTemplate();
        String ret = rt
                .getForObject(
                        "http://" + getIP() + local
                        + "file/"
                        + usuario + "/"
                        + projeto + "/"
                        + cenario + "/"
                        + diretorio + "/"
                        + file + (subdiretorio == null ? "" : "?subdiretorio=" + subdiretorio), String.class);
        return (ret != null && ret.length() > 0 && !ret.isEmpty() && !ret.startsWith("error:")) ? ret : null;
    }

}
