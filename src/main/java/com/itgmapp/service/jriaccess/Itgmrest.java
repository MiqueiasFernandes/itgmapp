package com.itgmapp.service.jriaccess;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.MultiValueMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.converter.StringHttpMessageConverter;

import com.itgmapp.domain.User;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Arrays;

public class Itgmrest {

    public static String local = ":8090/ITGMRest2/webresources/jriaccess/";
    public static String urlIP = "http://www.miqueiasfernandes.com.br/p/ip-itgm-rest.html";

    public static void createUser(User user) {
        String codnome = getCodNome(user);
        boolean success = sendText(codnome + "/*/*/*/" + "user.data", "desc/", user.toString());
        System.out.println("**************************************************************************************");
        System.out.println("Usuario: " + codnome + " criado com " + (success ? "sucesso." : "erro."));

    }

    public static String getCodNome(User user) {
        return new String(Base64.getEncoder().encodeToString(
                (user.getLogin()).getBytes()
        )).replaceAll("\\W", "");
    }

    public static String getIP() {
        String pagina = new RestTemplate().getForObject(urlIP, String.class);
        String[] ip = pagina.split("segue o ip para acesso ao ITGM Rest ");
        return ip[1].substring(0, ip[1].indexOf(":"));
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

       // MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();

      //  converter.setSupportedMediaTypes(
      //          Arrays.asList(new MediaType[]{MediaType.APPLICATION_OCTET_STREAM}));

      //  rt.setMessageConverters(Arrays.asList(converter, new StringHttpMessageConverter()));

        String uri = new String(
                "http://" + getIP() + local
                + url
                + "?&subdiretorio=" + subdir);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setAccept(Arrays.asList(new MediaType[]{MediaType.TEXT_PLAIN}));

        HttpEntity<byte[]> entity = null;
        InputStream in = null;
        try {
            entity = new HttpEntity<byte[]>(
                    // "conteudo do arquivo. fim.",
                    //file,
                    ///  new ByteArrayInputStream(((MultipartFile) (file)).getBytes()),
                    //                    convert((MultipartFile) (file)),
                    //    new ClassPathResource("estattabela.png"),//
                    ((MultipartFile) (file)).getBytes(),
                   /// convert((MultipartFile) (file)),
                    headers);
            
            in = new ByteArrayInputStream(((MultipartFile) (file)).getBytes());
        } catch (Exception ex) {
            System.out.println("#########################################errror entity: " + ex);
        }
        String ret = rt.postForObject(uri, entity, String.class);
        return "true".equals(ret);
    }

    public static File convert(MultipartFile file) {
        File convFile = new File(file.getOriginalFilename());
        try {
            convFile.createNewFile();
            FileOutputStream fos;
            fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();
            System.out.println("#########################################file: " + convFile.getAbsolutePath() + " / " + convFile.getName());
        } catch (Exception ex) {
            System.out.println("#########################################errror: " + ex);
        }

        return convFile;
    }

    public static String getFileExt(String fName) {
        return fName == null ? fName : (fName.contains(".") ? ("." + fName.replaceAll("^.*\\.", "")) : "");
    }

}
